"""
main.py
FastAPI entry point for Career Readiness Twin Backend API with AI Chatbot & Learning Resources endpoints.
"""

from typing import Dict, List, Optional, Any
from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from app.skill_proof import SkillEvidence, calculate_skill_confidence, batch_calculate_confidence
from app.readiness_twin import TARGET_ROLES, analyze_readiness
from app.minimum_path import calculate_minimum_path
from app.counterfactual import simulate_counterfactual

app = FastAPI(
    title="Career Readiness Twin API",
    description="Backend service for Skill Confidence Scores, Job Blockers, ROI Minimum Path, Counterfactual Simulations, AI Chatbot, and Learning Resources.",
    version="1.2.0"
)

# Enable CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Default Candidate Baseline Skills (Evidence-backed)
DEFAULT_EVIDENCE_MAP: Dict[str, Dict[str, float]] = {
    "Python & Pandas": {"resume_claim": 80.0, "github_evidence": 75.0, "certificate_score": 60.0, "assessment_score": 70.0},
    "SQL Querying": {"resume_claim": 70.0, "github_evidence": 40.0, "certificate_score": 0.0, "assessment_score": 50.0},
    "Power BI / Tableau": {"resume_claim": 60.0, "github_evidence": 20.0, "certificate_score": 0.0, "assessment_score": 40.0},
    "Data Cleaning & EDA": {"resume_claim": 85.0, "github_evidence": 80.0, "certificate_score": 70.0, "assessment_score": 75.0},
    "Statistical Analysis": {"resume_claim": 75.0, "github_evidence": 50.0, "certificate_score": 40.0, "assessment_score": 60.0},
    "Certified Data Associate": {"resume_claim": 50.0, "github_evidence": 0.0, "certificate_score": 0.0, "assessment_score": 30.0},

    "Python & Machine Learning": {"resume_claim": 85.0, "github_evidence": 80.0, "certificate_score": 70.0, "assessment_score": 75.0},
    "Statistical Modeling & Math": {"resume_claim": 80.0, "github_evidence": 65.0, "certificate_score": 60.0, "assessment_score": 70.0},
    "SQL & Data Wrangling": {"resume_claim": 75.0, "github_evidence": 70.0, "certificate_score": 50.0, "assessment_score": 65.0},
    "Deep Learning & PyTorch/TF": {"resume_claim": 70.0, "github_evidence": 55.0, "certificate_score": 40.0, "assessment_score": 50.0},
    "Model Evaluation & MLOps": {"resume_claim": 65.0, "github_evidence": 50.0, "certificate_score": 40.0, "assessment_score": 55.0},
    "Data Science Professional Cert": {"resume_claim": 50.0, "github_evidence": 0.0, "certificate_score": 0.0, "assessment_score": 30.0},

    "HTML5 & CSS3 Styling": {"resume_claim": 90.0, "github_evidence": 85.0, "certificate_score": 75.0, "assessment_score": 85.0},
    "JavaScript ES6+": {"resume_claim": 85.0, "github_evidence": 80.0, "certificate_score": 70.0, "assessment_score": 75.0},
    "Responsive & Mobile Design": {"resume_claim": 80.0, "github_evidence": 75.0, "certificate_score": 60.0, "assessment_score": 70.0},
    "DOM Manipulation & Web APIs": {"resume_claim": 75.0, "github_evidence": 70.0, "certificate_score": 50.0, "assessment_score": 65.0},
    "Git Version Control": {"resume_claim": 85.0, "github_evidence": 80.0, "certificate_score": 60.0, "assessment_score": 75.0},
    "Web Development Specialist Cert": {"resume_claim": 60.0, "github_evidence": 0.0, "certificate_score": 0.0, "assessment_score": 40.0},

    "React & Frontend Frameworks": {"resume_claim": 85.0, "github_evidence": 80.0, "certificate_score": 70.0, "assessment_score": 75.0},
    "Node.js & Express / Python API": {"resume_claim": 80.0, "github_evidence": 75.0, "certificate_score": 65.0, "assessment_score": 70.0},
    "Database Architecture (SQL/NoSQL)": {"resume_claim": 75.0, "github_evidence": 65.0, "certificate_score": 50.0, "assessment_score": 60.0},
    "REST API & GraphQL Integration": {"resume_claim": 80.0, "github_evidence": 75.0, "certificate_score": 60.0, "assessment_score": 70.0},
    "Docker & CI/CD Pipelines": {"resume_claim": 65.0, "github_evidence": 50.0, "certificate_score": 40.0, "assessment_score": 50.0},
    "Full Stack Engineering Cert": {"resume_claim": 50.0, "github_evidence": 0.0, "certificate_score": 0.0, "assessment_score": 30.0},
}

# Curated Learning Resources Database (Top Google & Platform Results)
LEARNING_RESOURCES: Dict[str, Dict[str, Any]] = {
    "SQL Querying": {
        "platforms": [
            {"name": "Coursera: SQL for Data Science", "url": "https://www.coursera.org/learn/sql-for-data-science", "provider": "Coursera / UC Davis", "rating": 4.8},
            {"name": "DataCamp: Intermediate SQL", "url": "https://www.datacamp.com/courses/intermediate-sql", "provider": "DataCamp", "rating": 4.7},
            {"name": "Udemy: The Complete SQL Bootcamp", "url": "https://www.udemy.com/course/the-complete-sql-bootcamp/", "provider": "Udemy", "rating": 4.8}
        ],
        "docs": [
            {"name": "PostgreSQL Official Documentation", "url": "https://www.postgresql.org/docs/", "type": "Documentation"},
            {"name": "W3Schools SQL Tutorial & Playground", "url": "https://www.w3schools.com/sql/", "type": "Interactive Guide"}
        ],
        "youtube": [
            {"title": "SQL Tutorial - Full Database Course for Beginners", "url": "https://www.youtube.com/watch?v=HXV3zeQKqGY", "channel": "freeCodeCamp.org", "duration": "4:20:00"},
            {"title": "Advanced SQL Queries Tutorial", "url": "https://www.youtube.com/watch?v=7S_tz1z_5bA", "channel": "Alex The Analyst", "duration": "45:00"}
        ]
    },
    "Power BI / Tableau": {
        "platforms": [
            {"name": "Microsoft Power BI Data Analyst Professional Cert", "url": "https://www.coursera.org/professional-certificates/microsoft-power-bi-data-analyst", "provider": "Coursera / Microsoft", "rating": 4.8},
            {"name": "DataCamp: Data Visualization with Power BI", "url": "https://www.datacamp.com/tracks/power-bi-fundamentals", "provider": "DataCamp", "rating": 4.7}
        ],
        "docs": [
            {"name": "Microsoft Power BI Documentation", "url": "https://learn.microsoft.com/en-us/power-bi/", "type": "Official Docs"},
            {"name": "Tableau Desktop Guide", "url": "https://www.tableau.com/learn/training", "type": "Training Guide"}
        ],
        "youtube": [
            {"title": "Power BI Full Course 2024 - Beginner to Advanced", "url": "https://www.youtube.com/watch?v=3u7MQz1EyPY", "channel": "freeCodeCamp.org", "duration": "3:45:00"},
            {"title": "Build Your First Dashboard in Power BI", "url": "https://www.youtube.com/watch?v=TmhQC87T78g", "channel": "Alex The Analyst", "duration": "32:00"}
        ]
    },
    "Python & Machine Learning": {
        "platforms": [
            {"name": "Machine Learning Specialization", "url": "https://www.coursera.org/specializations/machine-learning-introduction", "provider": "Coursera / Andrew Ng", "rating": 4.9},
            {"name": "DeepLearning.AI: Practical Data Science", "url": "https://www.deeplearning.ai/", "provider": "DeepLearning.AI", "rating": 4.9}
        ],
        "docs": [
            {"name": "Scikit-Learn User Guide & API", "url": "https://scikit-learn.org/stable/user_guide.html", "type": "Official Docs"},
            {"name": "PyTorch Tutorials & Models", "url": "https://pytorch.org/tutorials/", "type": "Official Docs"}
        ],
        "youtube": [
            {"title": "Python for Data Science & Machine Learning", "url": "https://www.youtube.com/watch?v=LHBE6Q9XlzI", "channel": "freeCodeCamp.org", "duration": "12:00:00"},
            {"title": "Machine Learning Course for Beginners", "url": "https://www.youtube.com/watch?v=i_LwzRVP7bg", "channel": "sentdex", "duration": "2:30:00"}
        ]
    },
    "React & Frontend Frameworks": {
        "platforms": [
            {"name": "Meta Front-End Developer Professional Certificate", "url": "https://www.coursera.org/professional-certificates/meta-front-end-developer", "provider": "Coursera / Meta", "rating": 4.8},
            {"name": "Next.js Official Learn Course", "url": "https://nextjs.org/learn", "provider": "Vercel", "rating": 4.9}
        ],
        "docs": [
            {"name": "React Official Documentation (react.dev)", "url": "https://react.dev/", "type": "Official Docs"},
            {"name": "MDN Web Docs: React Fundamentals", "url": "https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_getting_started", "type": "MDN Guide"}
        ],
        "youtube": [
            {"title": "React Course 2024 - Beginner to Advanced", "url": "https://www.youtube.com/watch?v=bMknfKXIFA8", "channel": "freeCodeCamp.org", "duration": "11:55:00"},
            {"title": "Next.js 14 Full Course 2024", "url": "https://www.youtube.com/watch?v=wm5gMKCOB4U", "channel": "JavaScript Mastery", "duration": "5:15:00"}
        ]
    }
}

class ChatbotRequest(BaseModel):
    user_message: str
    role_id: Optional[str] = "data_analyst_intern"
    readiness_pct: Optional[float] = 63.5

def get_candidate_confidence_scores(evidence_map: Dict[str, Dict[str, float]]) -> Dict[str, float]:
    return batch_calculate_confidence(evidence_map)

class AnalysisRequest(BaseModel):
    role_id: str = "data_analyst_intern"
    custom_evidence: Optional[Dict[str, Dict[str, float]]] = None

class CounterfactualRequest(BaseModel):
    role_id: str = "data_analyst_intern"
    candidate_skills: Optional[Dict[str, float]] = None
    hypothetical_boosts: Dict[str, float]

@app.get("/")
def root():
    return {"message": "Career Readiness Twin API v1.2 is running (Team SCORPIUS)."}

@app.get("/api/roles")
def list_roles():
    return [
        {"role_id": r.role_id, "role_name": r.role_name, "description": r.description}
        for r in TARGET_ROLES.values()
    ]

@app.get("/api/resources")
def get_resources(skill_name: Optional[str] = None):
    """
    Returns top Google/Coursera/YouTube learning resources matching requested skill.
    """
    if skill_name and skill_name in LEARNING_RESOURCES:
        return {skill_name: LEARNING_RESOURCES[skill_name]}
    return LEARNING_RESOURCES

@app.post("/api/chatbot")
def chatbot_reply(req: ChatbotRequest):
    """
    Mini AI Assistant Chatbot endpoint designed by Team SCORPIUS.
    Provides instant intelligent career guidance, gap resolution, and learning path tips.
    """
    msg = req.user_message.lower().strip()
    role_name = req.role_id.replace("_", " ").title() if req.role_id else "Target Role"

    if "hello" in msg or "hi" in msg or "hey" in msg:
        reply = f"Hello! 👋 I am your **SCORPIUS AI Career Assistant**. How can I help you reach 85%+ readiness for **{role_name}** today?"
    elif "blocker" in msg or "gap" in msg or "red" in msg:
        reply = f"🔴 **Job Blockers** represent required skills where your evidence confidence is below the role threshold. Check the **Minimum Path to Job** widget above to see which gaps give you the highest ROI per hour spent learning!"
    elif "how to increase" in msg or "score" in msg or "improve" in msg:
        reply = f"📈 To boost your readiness score above {req.readiness_pct or 63.5}%:\n1. Upload your latest resume or GitHub proof.\n2. Complete targeted micro-assessments.\n3. Use the **Counterfactual Simulator** to test 'What-If' scenarios like learning SQL (+12h) or Power BI (+15h)."
    elif "course" in msg or "resource" in msg or "youtube" in msg or "learn" in msg:
        reply = f"📚 Explore our **Smart Learning Resource Suggestion Box** below! It features top-rated Google search results, Coursera specializations, official documentation, and freeCodeCamp YouTube courses tailored for **{role_name}**."
    elif "team" in msg or "scorpius" in msg or "who created" in msg:
        reply = "🚀 This Career Readiness Twin application was designed and engineered with pride by **Team SCORPIUS**!"
    else:
        reply = f"Great question! For **{role_name}**, focus on strengthening your top technical & practical project proofs. Toggle skills in the **Counterfactual Simulator** below to project your exact readiness gain!"

    return {
        "reply": reply,
        "role_id": req.role_id,
        "team": "Team SCORPIUS"
    }

@app.post("/api/analyze")
def analyze(req: AnalysisRequest):
    evidence = req.custom_evidence if req.custom_evidence else DEFAULT_EVIDENCE_MAP
    confidence_scores = get_candidate_confidence_scores(evidence)
    
    twin_analysis = analyze_readiness(confidence_scores, req.role_id)
    min_path = calculate_minimum_path(twin_analysis, target_readiness_pct=85.0)

    return {
        "evidence_used": evidence,
        "confidence_scores": confidence_scores,
        "analysis": twin_analysis,
        "minimum_path": min_path,
        "team": "Team SCORPIUS"
    }

@app.post("/api/counterfactual")
def counterfactual(req: CounterfactualRequest):
    if not req.candidate_skills:
        confidence_scores = get_candidate_confidence_scores(DEFAULT_EVIDENCE_MAP)
    else:
        confidence_scores = req.candidate_skills

    result = simulate_counterfactual(
        baseline_skills=confidence_scores,
        role_id=req.role_id,
        hypothetical_boosts=req.hypothetical_boosts
    )
    result["team"] = "Team SCORPIUS"
    return result

@app.post("/api/upload_resume")
async def upload_resume(
    file: UploadFile = File(...),
    role_id: str = Form("data_analyst_intern")
):
    content = await file.read()
    text_content = content.decode("utf-8", errors="ignore").lower()

    updated_evidence = dict(DEFAULT_EVIDENCE_MAP)
    
    keywords_map = {
        "Python & Machine Learning": ["python", "machine learning", "scikit-learn", "xgboost"],
        "Statistical Modeling & Math": ["statistical modeling", "math", "hypothesis"],
        "SQL & Data Wrangling": ["sql", "data wrangling", "postgresql"],
        "Deep Learning & PyTorch/TF": ["deep learning", "pytorch", "tensorflow"],
        "Model Evaluation & MLOps": ["mlops", "model evaluation", "docker"],
        "Data Science Professional Cert": ["data science certification"],
        "HTML5 & CSS3 Styling": ["html5", "css3", "flexbox", "grid"],
        "JavaScript ES6+": ["javascript", "es6", "async/await"],
        "Responsive & Mobile Design": ["responsive design", "mobile first"],
        "DOM Manipulation & Web APIs": ["dom manipulation", "fetch api", "axios"],
        "Git Version Control": ["git", "github", "version control"],
        "Web Development Specialist Cert": ["web developer cert"],
        "React & Frontend Frameworks": ["react", "next.js", "frontend framework"],
        "Node.js & Express / Python API": ["node.js", "express", "fastapi"],
        "Database Architecture (SQL/NoSQL)": ["mongodb", "postgresql", "sql"],
        "REST API & GraphQL Integration": ["rest api", "graphql"],
        "Docker & CI/CD Pipelines": ["docker", "ci/cd", "github actions"],
        "Full Stack Engineering Cert": ["full stack cert"],
        "Python & Pandas": ["python", "pandas"],
        "SQL Querying": ["sql", "queries"],
        "Power BI / Tableau": ["power bi", "tableau"],
        "Data Cleaning & EDA": ["data cleaning", "eda"],
        "Statistical Analysis": ["statistics", "regression"],
        "Certified Data Associate": ["certified data associate"]
    }

    detected_skills = []
    for skill_name, keywords in keywords_map.items():
        count = sum(text_content.count(kw) for kw in keywords)
        if count > 0:
            detected_skills.append(skill_name)
            ev = dict(updated_evidence.get(skill_name, {"resume_claim": 50.0, "github_evidence": 40.0, "certificate_score": 30.0, "assessment_score": 50.0}))
            ev["resume_claim"] = min(100.0, ev["resume_claim"] + min(count * 15.0, 35.0))
            ev["github_evidence"] = min(100.0, ev["github_evidence"] + min(count * 12.0, 30.0))
            ev["assessment_score"] = min(100.0, ev["assessment_score"] + min(count * 10.0, 25.0))
            if "certifi" in text_content or "licensed" in text_content:
                ev["certificate_score"] = min(100.0, ev["certificate_score"] + 30.0)
            updated_evidence[skill_name] = ev

    confidence_scores = get_candidate_confidence_scores(updated_evidence)
    twin_analysis = analyze_readiness(confidence_scores, role_id)
    min_path = calculate_minimum_path(twin_analysis, target_readiness_pct=85.0)

    return {
        "filename": file.filename,
        "detected_skills": detected_skills,
        "confidence_scores": confidence_scores,
        "analysis": twin_analysis,
        "minimum_path": min_path,
        "team": "Team SCORPIUS"
    }

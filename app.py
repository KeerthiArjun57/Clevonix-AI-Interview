from flask import Flask, request, jsonify
from flask_cors import CORS
from PyPDF2 import PdfReader
import re

app = Flask(__name__)
CORS(app)


def extract_resume_data(text):

    text = text.replace("\n", " ")
    text = re.sub(r"\s+", " ", text).strip()

    data = {
        "name": "",
        "email": "",
        "phone": "",
        "skills": [],
        "education": [],
        "projects": [],
        "certifications": []
    }

    # Email
    email_match = re.search(
        r'[\w\.-]+@[\w\.-]+\.\w+',
        text
    )

    if email_match:
        data["email"] = email_match.group()

    # Phone
    phone_match = re.search(
        r'(\+91[\s-]?)?[6-9]\d{9}',
        text
    )

    if phone_match:
        data["phone"] = phone_match.group()

    # Name - first part of resume
    words = text.split()

    if len(words) >= 2:
        data["name"] = " ".join(words[:2])

    # Common technical skills
    skill_list = [
        "Python",
        "Java",
        "C",
        "C++",
        "JavaScript",
        "React",
        "React.js",
        "HTML",
        "CSS",
        "SQL",
        "MySQL",
        "MongoDB",
        "Machine Learning",
        "Deep Learning",
        "Artificial Intelligence",
        "NLP",
        "Computer Vision",
        "Data Science",
        "Power BI",
        "Tableau",
        "Excel",
        "Flask",
        "Django"
    ]

    text_lower = text.lower()

    for skill in skill_list:
        if skill.lower() in text_lower:
            data["skills"].append(skill)

    # Education keywords
    education_keywords = [
        "B.Tech",
        "B.E",
        "Bachelor",
        "M.Tech",
        "M.E",
        "Master",
        "B.Sc",
        "M.Sc",
        "Diploma",
        "12th",
        "10th"
    ]

    for item in education_keywords:
        if item.lower() in text_lower:
            data["education"].append(item)

    # Project detection
    project_keywords = [
        "project",
        "projects"
    ]

    for item in project_keywords:
        if item in text_lower:
            data["projects"].append(
                "Project information detected in resume"
            )
            break

    # Certification detection
    certification_keywords = [
        "certification",
        "certifications",
        "certificate"
    ]

    for item in certification_keywords:
        if item in text_lower:
            data["certifications"].append(
                "Certification information detected in resume"
            )
            break

    return data


@app.route("/")
def home():
    return jsonify({
        "message": "Clevonix Backend is Running!"
    })


@app.route("/analyze-resume", methods=["POST"])
def analyze_resume():

    if "resume" not in request.files:
        return jsonify({
            "error": "No resume file uploaded"
        }), 400

    file = request.files["resume"]

    if file.filename == "":
        return jsonify({
            "error": "No file selected"
        }), 400

    if not file.filename.lower().endswith(".pdf"):
        return jsonify({
            "error": "Only PDF files are supported"
        }), 400

    try:

        reader = PdfReader(file)

        text = ""

        for page in reader.pages:
            page_text = page.extract_text()

            if page_text:
                text += page_text + "\n"

        if not text.strip():
            return jsonify({
                "error": "Could not extract text from this PDF"
            }), 400

        resume_data = extract_resume_data(text)
                # Resume Score
        score = 0

        if resume_data["name"]:
            score += 10

        if resume_data["email"]:
            score += 10

        if resume_data["phone"]:
            score += 10

        if len(resume_data["skills"]) > 0:
            score += 20

        if len(resume_data["education"]) > 0:
            score += 20

        if len(resume_data["projects"]) > 0:
            score += 15

        if len(resume_data["certifications"]) > 0:
            score += 15

        resume_data["score"] = score

        return jsonify({
            "success": True,
            "message": "Resume analyzed successfully",
            "data": resume_data
        })

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500

@app.route("/generate-question", methods=["POST"])
def generate_question():

    data = request.get_json()

    difficulty = data.get("difficulty", "Easy")

    questions = {
        "Easy": [
    "Tell me about yourself.",
    "What are your main technical skills?",
    "Explain one project mentioned in your resume.",
    "Why did you choose your field of study?",
    "What are your strengths?"
],

        "Medium": [
    "Explain the difference between supervised and unsupervised learning.",
    "How did you handle data preprocessing in your project?",
    "Why did you choose a particular machine learning algorithm?",
    "How do you handle missing values in a dataset?",
    "Explain the difference between SQL and NoSQL databases."
],

        "Hard": [
            "Explain how you would design an end-to-end Machine Learning pipeline.",
            "How would you handle an imbalanced dataset?",
            "How do you detect overfitting in a Machine Learning model?",
            "How would you optimize a slow SQL query?",
            "Explain the bias-variance tradeoff."
        ]
    }

    selected_questions = questions.get(
        difficulty,
        questions["Easy"]
    )

    return jsonify({
        "success": True,
        "difficulty": difficulty,
        "questions": selected_questions
    })
if __name__ == "__main__":
    app.run(
        debug=True,
        port=5000
    )
import { useState } from "react";
import "./InterviewQuestions.css";

function InterviewQuestions({
  onHomeClick,
  onFinish,
  initialDifficulty
}) {

  const [difficulty, setDifficulty] = useState(
    initialDifficulty || "Easy"
  );

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [backendQuestions, setBackendQuestions] = useState(null);

  const [answers, setAnswers] = useState({
    Easy: [],
    Medium: [],
    Hard: []
  });

  const questions = {

    Easy: [
      "Tell me about yourself.",
      "What are your main technical skills?",
      "Explain one project mentioned in your resume.",
      "Why did you choose your field of study?",
      "What are your strengths?"
    ],

    Medium: [
      "Explain the difference between supervised and unsupervised learning.",
      "How did you handle data preprocessing in your project?",
      "Why did you choose a particular machine learning algorithm?",
      "How do you handle missing values in a dataset?",
      "Explain the difference between SQL and NoSQL databases."
    ],

    Hard: [
      "How would you improve a machine learning model if its validation performance decreases?",
      "Explain the trade-off between model complexity and generalization.",
      "How would you design an AI interview system for real-world scalability?",
      "How would you detect and handle overfitting in a machine learning model?",
      "How would you evaluate an AI system that analyzes interview performance?"
    ]

  };


  /* =========================
     ANSWER KEYWORDS
  ========================= */

  const answerKeywords = {

    Easy: [
      ["experience", "skills", "education", "goal"],
      ["python", "sql", "machine learning", "data"],
      ["project", "technology", "role", "result"],
      ["interest", "career", "technology", "study"],
      ["communication", "problem solving", "teamwork", "learning"]
    ],

    Medium: [
      ["supervised", "unsupervised", "label"],
      ["cleaning", "missing", "duplicate", "preprocessing"],
      ["accuracy", "dataset", "performance", "algorithm"],
      ["mean", "median", "mode", "missing"],
      ["sql", "nosql", "relational", "database"]
    ],

    Hard: [
      ["validation", "hyperparameter", "feature", "model"],
      ["complexity", "generalization", "overfitting", "underfitting"],
      ["scalability", "server", "database", "api"],
      ["overfitting", "validation", "regularization", "training"],
      ["accuracy", "precision", "recall", "feedback"]
    ]

  };


  /* =========================
     CALCULATE SCORE
  ========================= */

  const calculateScore = (level, userAnswers) => {

    const keywords = answerKeywords[level];

    let totalScore = 0;

    userAnswers.forEach((answer, index) => {

      if (!answer || answer.trim() === "") {
        return;
      }

      const answerText = answer.toLowerCase();

      const questionKeywords = keywords[index];

      let matchedKeywords = 0;

      questionKeywords.forEach((keyword) => {

        if (
          answerText.includes(
            keyword.toLowerCase()
          )
        ) {
          matchedKeywords++;
        }

      });

      const questionScore =
        (matchedKeywords / questionKeywords.length) * 10;

      totalScore += questionScore;

    });

    return Math.round(
      (totalScore / (userAnswers.length * 10)) * 100
    );
  };


  /* =========================
     GENERATE FEEDBACK
  ========================= */

  const generateFeedback = (level, userAnswers) => {

    const keywords = answerKeywords[level];

    return userAnswers.map((answer, index) => {

      if (!answer || answer.trim() === "") {
        return "Not Answered";
      }

      const answerText = answer.toLowerCase();

      const questionKeywords = keywords[index];

      const matchedKeywords =
        questionKeywords.filter(
          (keyword) =>
            answerText.includes(
              keyword.toLowerCase()
            )
        );

      if (matchedKeywords.length >= 3) {

        return "Excellent answer! Your response covers the important points. Keep explaining your ideas clearly.";

      }

      if (matchedKeywords.length >= 2) {

        return "Good answer! You included some important points. Try adding more relevant details to make your answer stronger.";

      }

      if (matchedKeywords.length >= 1) {

        return "Your answer has a relevant point. Try explaining the concept with more details and examples.";

      }

      return "Try to give a more detailed and relevant answer. Review the concept and explain it in your own words.";

    });
  };


  /* =========================
     LOAD BACKEND QUESTIONS
  ========================= */

  const loadBackendQuestions = async (level) => {

    try {

      const response = await fetch(
        "http://127.0.0.1:5000/generate-question",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            difficulty: level
          })
        }
      );

      const result = await response.json();

      console.log(
        "BACKEND QUESTIONS:",
        result
      );

      if (result.success) {

        setBackendQuestions(
          result.questions
        );

      }

    } catch (error) {

      console.error(
        "Question API error:",
        error
      );

    }
  };


  /* =========================
     CURRENT QUESTIONS
  ========================= */

  const currentQuestions =
    backendQuestions || questions[difficulty];


  /* =========================
     CHANGE DIFFICULTY
  ========================= */

  const handleDifficultyChange = async (level) => {

    setDifficulty(level);

    setCurrentQuestion(0);

    setBackendQuestions(null);

    await loadBackendQuestions(level);

  };


  /* =========================
     SAVE ANSWER
  ========================= */

  const handleAnswerChange = (event) => {

    const newAnswers = {
      ...answers
    };

    newAnswers[difficulty] = [
      ...newAnswers[difficulty]
    ];

    newAnswers[difficulty][currentQuestion] =
      event.target.value;

    setAnswers(newAnswers);

  };


  /* =========================
     ANSWER PROGRESS
  ========================= */

  const answeredCount =
    answers[difficulty].filter(
      (answer) =>
        answer &&
        answer.trim() !== ""
    ).length;


  const progressPercentage =
    (answeredCount /
      currentQuestions.length) * 100;


  /* =========================
     NEXT QUESTION
  ========================= */

  const handleNext = () => {

    if (
      currentQuestion <
      currentQuestions.length - 1
    ) {

      setCurrentQuestion(
        currentQuestion + 1
      );

    }

  };


  /* =========================
     PREVIOUS QUESTION
  ========================= */

  const handlePrevious = () => {

    if (currentQuestion > 0) {

      setCurrentQuestion(
        currentQuestion - 1
      );

    }

  };


  /* =========================
     FINISH INTERVIEW
  ========================= */

  const handleFinish = () => {

    const currentAnswers =
      answers[difficulty];

    const allAnswered =
      currentAnswers.length ===
        currentQuestions.length &&
      currentAnswers.every(
        (answer) =>
          answer &&
          answer.trim() !== ""
      );

    if (!allAnswered) {

      alert(
        "Please answer all questions before finishing the interview."
      );

      return;
    }


    const score = calculateScore(
      difficulty,
      currentAnswers
    );


    const feedback = generateFeedback(
      difficulty,
      currentAnswers
    );


    onFinish(
      difficulty,
      currentAnswers,
      score,
      feedback
    );

  };


  /* =========================
     UI
  ========================= */

  return (

    <div className="questions-page">

      <button
        className="home-button"
        onClick={onHomeClick}
      >
        ← Home
      </button>


      <header className="questions-header">

        <div>

          <h1>
            Interview Questions
          </h1>

          <p>
            Practice interview questions based on your selected difficulty.
          </p>

        </div>


        <div className="questions-logo">
          CLEVONIX
        </div>

      </header>


      <main className="questions-content">


        {/* DIFFICULTY */}

        <section className="difficulty-section">

          <h2>
            Choose Difficulty
          </h2>

          <p>
            Select a level to begin your interview practice.
          </p>


          <div className="difficulty-buttons">


            <button
              className={`difficulty-btn easy ${
                difficulty === "Easy"
                  ? "selected"
                  : ""
              }`}
              onClick={() =>
                handleDifficultyChange("Easy")
              }
            >

              <span className="difficulty-dot easy-dot">
                ●
              </span>

              <span>
                Easy
              </span>

            </button>


            <button
              className={`difficulty-btn medium ${
                difficulty === "Medium"
                  ? "selected"
                  : ""
              }`}
              onClick={() =>
                handleDifficultyChange("Medium")
              }
            >

              <span className="difficulty-dot medium-dot">
                ●
              </span>

              <span>
                Medium
              </span>

            </button>


            <button
              className={`difficulty-btn hard ${
                difficulty === "Hard"
                  ? "selected"
                  : ""
              }`}
              onClick={() =>
                handleDifficultyChange("Hard")
              }
            >

              <span className="difficulty-dot hard-dot">
                ●
              </span>

              <span>
                Hard
              </span>

            </button>

          </div>

        </section>


        {/* QUESTION CARD */}

        <section className="question-card">

          <div className="question-top">

            <div>

              <span className="level-label">
                {difficulty} Level
              </span>

              <h2>

                Question{" "}
                {currentQuestion + 1}

                <span className="question-count">
                  {" "} / {currentQuestions.length}
                </span>

              </h2>

            </div>


            <div className="question-number">
              {currentQuestion + 1}
            </div>

          </div>


          {/* QUESTION */}

          <div className="question-content">

            <p>
              {
                currentQuestions[
                  currentQuestion
                ]
              }
            </p>

          </div>


          {/* ANSWER */}

          <textarea
            className="answer-box"
            placeholder="Type your answer here..."
            value={
              answers[difficulty][
                currentQuestion
              ] || ""
            }
            onChange={
              handleAnswerChange
            }
          />


          {/* ACTION BUTTONS */}

          <div className="question-actions">


            <button
              className="previous-btn"
              onClick={handlePrevious}
              disabled={
                currentQuestion === 0
              }
            >
              ← Previous
            </button>


            {currentQuestion ===
            currentQuestions.length - 1 ? (

              <button
                className="finish-btn"
                onClick={handleFinish}
              >
                Finish Interview ✓
              </button>

            ) : (

              <button
                className="next-btn"
                onClick={handleNext}
              >
                Next Question →
              </button>

            )}

          </div>

        </section>


        {/* PROGRESS */}

        <section className="progress-section">

          <div className="progress-header">

            <span>
              Answer Progress
            </span>

            <span>
              {answeredCount} /{" "}
              {currentQuestions.length}{" "}
              Answered
            </span>

          </div>


          <div className="progress-bar">

            <div
              className="progress-fill"
              style={{
                width:
                  `${progressPercentage}%`
              }}
            ></div>

          </div>


          <div className="progress-status">

            <span>
              Answered: {answeredCount}
            </span>

            <span>
              Not Answered:{" "}
              {
                currentQuestions.length -
                answeredCount
              }
            </span>

          </div>

        </section>

      </main>

    </div>

  );
}

export default InterviewQuestions;
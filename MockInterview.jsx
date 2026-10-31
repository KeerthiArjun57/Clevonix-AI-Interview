import { useState, useRef } from "react";
import "./MockInterview.css";

function MockInterview({ onHomeClick, onFinish }) {

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

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [difficulty, setDifficulty] = useState("Easy");
  const currentQuestions = questions[difficulty];
  const [answers, setAnswers] = useState({
  Easy: [],
  Medium: [],
  Hard: []
});
  const [isListening, setIsListening] = useState(false);
  const [started, setStarted] = useState(false);

  const recognitionRef = useRef(null);

  // Start Voice Recognition
  const startListening = () => {

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(
        "Speech recognition is not supported in this browser. Please use Google Chrome."
      );
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {

      const spokenAnswer =
        event.results[0][0].transcript;

      setAnswers((prev) => {

  const updated = {
    ...prev,
    [difficulty]: [
      ...prev[difficulty]
    ]
  };

  updated[difficulty][currentQuestion] = spokenAnswer;

  return updated;
});
    };

    recognition.onerror = () => {
      setIsListening(false);
      alert("Unable to recognize your voice. Please try again.");
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    recognition.start();
  };

  // Stop Voice Recognition
  const stopListening = () => {

    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    setIsListening(false);
  };

  // Start Interview
  const startInterview = () => {
    setStarted(true);
  };

  // Next Question
  const handleNext = () => {

  if (currentQuestion < currentQuestions.length - 1) {

    setCurrentQuestion((prev) => prev + 1);

  } else {

    if (difficulty === "Easy") {

      setDifficulty("Medium");
      setCurrentQuestion(0);

    } else if (difficulty === "Medium") {

      setDifficulty("Hard");
      setCurrentQuestion(0);

    }

  }
};

  // Previous Question
  const handlePrevious = () => {

    if (currentQuestion > 0) {

      setCurrentQuestion((prev) => prev - 1);

    }
  };

  // Finish Interview
const handleFinish = () => {

  const allAnswers = [
    ...(answers.Easy || []),
    ...(answers.Medium || []),
    ...(answers.Hard || [])
  ];

  const answeredCount = allAnswers.filter(
    (answer) => answer && answer.trim() !== ""
  ).length;

  const totalQuestions = 15;

  const score = Math.round(
    (answeredCount / totalQuestions) * 100
  );

  if (onFinish) {
    onFinish({
      score: score,
      answered: answeredCount,
      total: totalQuestions,
      answers: answers
    });
  }
};

  // START SCREEN
  if (!started) {

    return (
      <div className="mock-page">

        <button
          className="mock-home-btn"
          onClick={onHomeClick}
        >
          ← Home
        </button>

        <header className="mock-header">

          <div>
            <h1>Mock Interview</h1>

            <p>
              Practice your interview using voice-based questions.
            </p>
          </div>

          <div className="mock-logo">
            CLEVONIX
          </div>

        </header>

        <section className="mock-start-card">

          <div className="mock-icon">
            🎤
          </div>

          <h2>
            Ready for Your Mock Interview?
          </h2>

          <p>
            Answer the interview questions by speaking.
            Your voice responses will be converted into text
            automatically.
          </p>

          <button
            className="start-mock-btn"
            onClick={startInterview}
          >
            Start Mock Interview →
          </button>

        </section>

      </div>
    );
  }

  // INTERVIEW SCREEN
  return (
    <div className="mock-page">

      <button
        className="mock-home-btn"
        onClick={onHomeClick}
      >
        ← Home
      </button>

      <header className="mock-header">

        <div>
          <h1>Mock Interview</h1>

          <p>
            Answer the question using your voice.
          </p>
        </div>

        <div className="mock-logo">
          CLEVONIX
        </div>

      </header>

      <section className="mock-question-card">

        {/* PROGRESS */}

        <div className="mock-progress">
          Question {currentQuestion + 1} / {currentQuestions.length}
        </div>

        {/* QUESTION */}

        <h2>
          {currentQuestions[currentQuestion]}
        </h2>

        {/* VOICE SECTION */}

        <div className="voice-section">

          <div className="voice-icon">
            🎤
          </div>

          <p className="voice-status">
            {isListening
              ? "Listening... Speak your answer."
              : answers[difficulty]?.[currentQuestion]
              ? "Answer recorded successfully."
              : "Click the button and start speaking."}
          </p>

          {/* SPEAK BUTTON */}

          {!isListening ? (

            <button
              className="speak-btn"
              onClick={startListening}
            >
              🎤 Start Speaking
            </button>

          ) : (

            <button
              className="stop-btn"
              onClick={stopListening}
            >
              ⏹ Stop Recording
            </button>

          )}

          {/* CONVERTED ANSWER */}

          {answers[difficulty]?.[currentQuestion] && (

            <div className="voice-answer">

              <h3>
                Your Answer
              </h3>

              <p>
                {answers[difficulty]?.[currentQuestion]}
              </p>

            </div>

          )}

        </div>

        {/* ACTION BUTTONS */}

        <div className="mock-actions">

          <button
            className="mock-prev-btn"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            ← Previous
          </button>

          {difficulty === "Hard" &&
currentQuestion === currentQuestions.length - 1 ? (

  <button
    className="mock-finish-btn"
    onClick={handleFinish}
  >
    Finish Interview ✓
  </button>

) : (

  <button
    className="mock-next-btn"
    onClick={handleNext}
  >
    {currentQuestion === currentQuestions.length - 1
      ? `Next ${difficulty === "Easy" ? "Medium" : "Hard"} Level →`
      : "Next Question →"}
  </button>

)}

        </div>

      </section>

    </div>
  );
}

export default MockInterview;
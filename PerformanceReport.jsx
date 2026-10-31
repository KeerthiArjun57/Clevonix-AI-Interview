import "./PerformanceReport.css";

function PerformanceReport({
  onHomeClick,
  data,
  initialDifficulty,
  onPracticeAgain
}) {
  const difficulty =
    initialDifficulty || "Easy";

  const currentData =
    data?.[difficulty] || {
      answered: 0,
      total: 5,
      score: 0,
      feedback: []
    };

  const completed =
    currentData.answered === currentData.total &&
    currentData.total > 0;

  const progress =
    currentData.total > 0
      ? Math.round(
          (currentData.answered /
            currentData.total) *
            100
        )
      : 0;

  return (
    <div className="performance-page">

      {/* HEADER */}

      <div className="performance-header">

        <button
          className="home-button"
          onClick={onHomeClick}
        >
          ← Home
        </button>

        <div>
          <h1>Performance Report</h1>

          <p>
            Review your interview practice performance.
          </p>
        </div>

        <div className="performance-logo">
          CLEVONIX
        </div>

      </div>


      {/* DIFFICULTY TABS */}

      <div className="difficulty-tabs">

        <button
          className={
            difficulty === "Easy"
              ? "difficulty-tab active"
              : "difficulty-tab"
          }
          onClick={() =>
            onPracticeAgain("Easy")
          }
        >
          Easy
        </button>

        <button
          className={
            difficulty === "Medium"
              ? "difficulty-tab active"
              : "difficulty-tab"
          }
          onClick={() =>
            onPracticeAgain("Medium")
          }
        >
          Medium
        </button>

        <button
          className={
            difficulty === "Hard"
              ? "difficulty-tab active"
              : "difficulty-tab"
          }
          onClick={() =>
            onPracticeAgain("Hard")
          }
        >
          Hard
        </button>

      </div>


      {/* LEVEL CARD */}

      <section className="performance-level-card">

        <span className="level-label">
          CURRENT LEVEL
        </span>

        <h2>
          {difficulty} Level
        </h2>

        <p>
          Your performance for the selected
          interview difficulty.
        </p>

      </section>


      {/* STAT CARDS */}

      <section className="report-stats">

        <div className="report-stat-card">

          <span>
            Score
          </span>

          <strong>
            {currentData.score}%
          </strong>

        </div>


        <div className="report-stat-card">

          <span>
            Answered
          </span>

          <strong>
            {currentData.answered}
            {" / "}
            {currentData.total}
          </strong>

        </div>


        <div className="report-stat-card">

          <span>
            Progress
          </span>

          <strong>
            {progress}%
          </strong>

        </div>

      </section>


      {/* PROGRESS */}

      <section className="progress-section">

        <div className="progress-title">

          <strong>
            Interview Progress
          </strong>

          <span>
            {currentData.answered} /{" "}
            {currentData.total}
          </span>

        </div>


        <div className="progress-bar">

          <div
            className="progress-fill"
            style={{
              width: `${progress}%`
            }}
          ></div>

        </div>

      </section>


      {/* STATUS */}

      <section className="status-card">

        {completed ? (
          <>
            <div className="status-icon">
              ✓
            </div>

            <div>

              <h3>
                Interview Completed
              </h3>

              <p>
                You have answered all the
                questions in this level.
              </p>

            </div>
          </>
        ) : (
          <>
            <div className="status-icon">
              !
            </div>

            <div>

              <h3>
                Interview In Progress
              </h3>

              <p>
                Complete all questions to finish
                this level.
              </p>

            </div>
          </>
        )}

      </section>


      {/* FEEDBACK */}

      <section className="feedback-section">

        <h2>
          Performance Feedback
        </h2>


        {currentData.feedback &&
        currentData.feedback.length > 0 ? (

          <div className="feedback-list">

            {currentData.feedback.map(
              (item, index) => (

                <div
                  className="feedback-card"
                  key={index}
                >

                  {typeof item === "string"
                    ? item
                    : item?.feedback ||
                      "Feedback available for this question."}

                </div>

              )
            )}

          </div>

        ) : (

          <div className="no-feedback">

            <p>
              No feedback available yet.
            </p>

            <small>
              Complete the interview questions
              to receive performance feedback.
            </small>

          </div>

        )}

      </section>


      {/* ACTION BUTTONS */}

      <section className="report-actions">

        <button
          className="practice-button"
          onClick={() =>
            onPracticeAgain(difficulty)
          }
        >
          Practice {difficulty} Again
        </button>


        <button
          className="dashboard-button"
          onClick={onHomeClick}
        >
          Back to Dashboard
        </button>

      </section>

    </div>
  );
}

export default PerformanceReport;
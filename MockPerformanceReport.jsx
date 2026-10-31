import "./MockPerformanceReport.css";

function MockPerformanceReport({
  onHomeClick,
  score = 0,
  answered = 0,
  total = 15
}) {
    let performanceText = "Keep Improving!";

if (score >= 80) {
  performanceText = "Excellent Performance!";
} else if (score >= 60) {
  performanceText = "Good Performance!";
} else if (score > 0) {
  performanceText = "Keep Practicing!";
}

  return (
    <div className="report-page">

      <header className="report-header">

        <div>
          <h1>Mock Interview Performance</h1>

          <p>
            Review your mock interview performance.
          </p>
        </div>

        <div className="report-logo">
          CLEVONIX
        </div>

      </header>

      <main className="report-content">

        <section className="score-card">

          <div className="score-circle">
            <span>{score}%</span>
          </div>

          <div className="score-info">

            <span className="completed-label">
              ✓ Mock Interview Completed
            </span>

            <h2>
              {score >= 80
                ? "Excellent Performance!"
                : score >= 60
                ? "Good Performance!"
                : "Keep Improving!"}
            </h2>

            <p>
              You answered {answered} out of {total} questions.
            </p>

          </div>

        </section>

        <section className="statistics-grid">

          <div className="stat-card">
            <span className="stat-icon">🎯</span>
            <p>Overall Score</p>
            <h3>{score}%</h3>
          </div>

          <div className="stat-card">
            <span className="stat-icon">📝</span>
            <p>Questions Answered</p>
            <h3>{answered} / {total}</h3>
          </div>

          <div className="stat-card">
            <span className="stat-icon">🎤</span>
            <p>Interview Type</p>
            <h3>Mock</h3>
          </div>

          <div className="stat-card">
            <span className="stat-icon">⭐</span>
            <p>Performance</p>
            <h3>
              {score >= 80
                ? "Excellent"
                : score >= 60
                ? "Good"
                : "Improve"}
            </h3>
          </div>

        </section>

        <section className="feedback-card">

          <h2>AI Feedback</h2>

          <div className="feedback-box">

            <span className="feedback-icon">
              💡
            </span>

            <div>

              <h3>{performanceText}!</h3>

              <p>
                 You answered {answered} out of {total} questions.
    Continue practicing to improve your interview performance.
              </p>

            </div>

          </div>

        </section>

        <div className="report-actions">

          <button
            className="home-report-btn"
            onClick={onHomeClick}
          >
            ← Back to Home
          </button>

        </div>

      </main>

    </div>
  );
}

export default MockPerformanceReport;
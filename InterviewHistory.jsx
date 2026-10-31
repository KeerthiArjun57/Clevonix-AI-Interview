import "./InterviewHistory.css";

function InterviewHistory({
  history,
  onHomeClick,
  onClearHistory
}) {
  return (
    <div className="history-page">

      <button
        className="home-button"
        onClick={onHomeClick}
      >
        ← Home
      </button>

      <header className="history-header">

        <div>
          <span className="history-label">
            CLEVONIX
          </span>

          <h1>
            Interview History
          </h1>

          <p>
            Review your previous interview practice attempts.
          </p>
        </div>

        <div className="history-logo">
          CLEVONIX
        </div>

      </header>

      <main className="history-content">

        {history.length === 0 ? (

          <section className="empty-history">

            <div className="empty-icon">
              📋
            </div>

            <h2>
              No Interview History
            </h2>

            <p>
              Complete an interview to see your
              performance history here.
            </p>

            <button
              className="start-history-button"
              onClick={onHomeClick}
            >
              Start Interview →
            </button>

          </section>

        ) : (

          <section className="history-card">

            <div className="history-title-row">

              <div>
                <h2>
                  Previous Interviews
                </h2>

                <p>
                  {history.length} interview
                  {history.length !== 1 ? "s" : ""} recorded
                </p>
              </div>

              <button
                className="clear-history-button"
                onClick={onClearHistory}
              >
                Clear History
              </button>

            </div>


            <div className="history-list">

              {history.map((item, index) => (

                <div
                  className="history-item"
                  key={index}
                >

                  <div className="history-number">
                    {index + 1}
                  </div>


                  <div className="history-info">

                    <span className="history-level">
                      {item.difficulty} Level
                    </span>

                    <p>
                      {item.date}
                    </p>

                  </div>


                  <div className="history-score">

                    <strong>
                      {item.score}%
                    </strong>

                    <span>
                      {item.answered} / {item.total}
                      {" Answered"}
                    </span>

                  </div>


                  <div className="history-status">

                    {item.answered === item.total ? (

                      <span className="completed-status">
                        ✓ Completed
                      </span>

                    ) : (

                      <span className="incomplete-status">
                        Incomplete
                      </span>

                    )}

                  </div>


                  <button
                    className="view-details-button"
                    onClick={() => {
                      alert(
                        `Difficulty: ${item.difficulty}\n` +
                        `Score: ${item.score}%\n` +
                        `Answered: ${item.answered}/${item.total}\n` +
                        `Date: ${item.date}`
                      );
                    }}
                  >
                    View Details
                  </button>

                </div>

              ))}

            </div>

          </section>

        )}

      </main>

    </div>
  );
}

export default InterviewHistory;
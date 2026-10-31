import { useState } from "react";
import "./Dashboard.css";

function Dashboard({
  onResumeClick,
  onQuestionsClick,
  onPerformanceClick,
  onMockClick,
  onLearningClick,
  onVisionClick,
  onHistoryClick,
  onSettingsClick,
  profile,
  performance,
  interviewHistory,
  resumeUploaded,
  resumeScore,
  onLogout
}) {
  const [showNotifications, setShowNotifications] =
    useState(false);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Welcome to CLEVONIX!",
      message: "Start your interview preparation.",
      read: false
    },
    {
      id: 2,
      title: "Practice Questions",
      message:
        "Try answering today's interview questions.",
      read: false
    },
    {
      id: 3,
      title: "Resume Analysis",
      message:
        "Upload your resume to check your score.",
      read: false
    }
  ]);

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  const history = interviewHistory || [];

  const totalInterviews = history.length;

  const totalQuestions = history.reduce(
    (sum, item) =>
      sum + (item.answered || 0),
    0
  );

  const averageScore =
    totalInterviews > 0
      ? Math.round(
          history.reduce(
            (sum, item) =>
              sum + (item.score || 0),
            0
          ) / totalInterviews
        )
      : 0;

  const handleNotificationClick = (id) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? {
              ...notification,
              read: true
            }
          : notification
      )
    );
  };

  return (
    <div className="dashboard-container">

      {/* SIDEBAR */}

      <aside className="sidebar">

        <div className="sidebar-logo">
          CLEVONIX
        </div>

        <p className="sidebar-subtitle">
          AI Interview Platform
        </p>

        <nav className="sidebar-menu">

          <button className="menu-item active">
            🏠
            <span>Dashboard</span>
          </button>

          <button
            className="menu-item"
            onClick={onResumeClick}
          >
            📄
            <span>Resume</span>
          </button>

          <button
            className="menu-item"
            onClick={onMockClick}
          >
            🎤
            <span>Mock Interview</span>
          </button>

          <button
            className="menu-item"
            onClick={onQuestionsClick}
          >
            ❓
            <span>Questions</span>
          </button>

          <button
  className="menu-item"
  onClick={() => onPerformanceClick("Easy")}
>
  📊
  <span>Performance</span>
</button>

          <button
            className="menu-item"
            onClick={onHistoryClick}
          >
            🕘
            <span>Interview History</span>
          </button>

          <button
            className="menu-item"
            onClick={onVisionClick}
          >
            👁️
            <span>Vision Analysis</span>
          </button>

          <button
            className="menu-item"
            onClick={onSettingsClick}
          >
            ⚙️
            <span>Settings</span>
          </button>

        </nav>

        <div className="sidebar-bottom">

          <button
            className="menu-item logout"
            onClick={onLogout}
          >
            🚪
            <span>Logout</span>
          </button>

        </div>

      </aside>


      {/* MAIN */}

      <main className="dashboard-main">

        {/* TOPBAR */}

        <header className="topbar">

          <div>

            <h1>
              Welcome back! 👋
            </h1>

            <p>
              Let's prepare you for your next interview.
            </p>

          </div>


          <div className="topbar-right">

            {/* NOTIFICATIONS */}

            <div className="notification-wrapper">

              <button
                className="notification-button"
                onClick={() =>
                  setShowNotifications(
                    !showNotifications
                  )
                }
              >
                🔔

                {unreadCount > 0 && (
                  <span className="notification-badge">
                    {unreadCount}
                  </span>
                )}

              </button>


              {showNotifications && (
                <div className="notification-panel">

                  <h3>
                    Notifications
                  </h3>

                  {notifications.map(
                    (notification) => (
                      <div
                        className={`notification-item ${
                          notification.read
                            ? "read"
                            : "unread"
                        }`}
                        key={notification.id}
                        onClick={() =>
                          handleNotificationClick(
                            notification.id
                          )
                        }
                      >

                        <strong>
                          {notification.title}
                        </strong>

                        <p>
                          {notification.message}
                        </p>

                      </div>
                    )
                  )}

                </div>
              )}

            </div>


            {/* PROFILE */}

            <div className="profile-box">

              <div className="profile-icon">
                {(profile?.name || "C")
                  .charAt(0)
                  .toUpperCase()}
              </div>

              <div>

                <strong>
                  {profile?.name || "Candidate"}
                </strong>

                <small>
                  {profile?.role || "Student"}
                </small>

              </div>

            </div>

          </div>

        </header>


        {/* WELCOME CARD */}

        <section className="welcome-card">

          <div>

            <span className="welcome-tag">
              AI POWERED
            </span>

            <h2>
              Prepare. Practice. Perform.
            </h2>

            <p>
              Improve your interview skills with
              personalized AI-powered preparation.
            </p>

          </div>

        </section>


        {/* PREPARATION */}

        <section className="section-title">

          <h2>
            Interview Preparation
          </h2>

          <p>
            Choose an option to continue your preparation.
          </p>

        </section>


        <section className="feature-grid">

          {/* RESUME */}

          <div className="feature-card">

            <div className="feature-icon">
              📄
            </div>

            <h3>
              Resume Analysis
            </h3>

            <p>
              Upload your resume and get AI-powered
              analysis of your skills, projects and
              qualifications.
            </p>

            <button
              className="feature-button"
              onClick={onResumeClick}
            >
              Analyze Resume →
            </button>

          </div>


          {/* MOCK INTERVIEW */}

          <div className="feature-card">

            <div className="feature-icon">
              🎤
            </div>

            <h3>
              Mock Interview
            </h3>

            <p>
              Practice realistic HR and technical
              interviews with AI-generated questions.
            </p>

            <button
              className="feature-button"
              onClick={onMockClick}
            >
              Start Interview →
            </button>

          </div>


          {/* QUESTIONS */}

          <div className="feature-card">

            <div className="feature-icon">
              ❓
            </div>

            <h3>
              Practice Questions
            </h3>

            <p>
              Practice personalized interview questions
              based on difficulty level.
            </p>

            <button
              className="feature-button"
              onClick={onQuestionsClick}
            >
              Practice Now →
            </button>

          </div>


          {/* LEARNING */}

          <div className="feature-card">

            <div className="feature-icon">
              🎓
            </div>

            <h3>
              Interview Learning Hub
            </h3>

            <p>
              Learn how to answer HR, technical and
              resume-based interview questions confidently.
            </p>

            <button
              className="feature-button"
              onClick={onLearningClick}
            >
              Start Learning →
            </button>

          </div>

        </section>


        {/* VISION */}

        <div
          className="feature-card"
          onClick={onVisionClick}
        >

          <div className="feature-icon">
            👁️
          </div>

          <h3>
            Vision Analysis
          </h3>

          <p>
            Analyze your eye contact, facial expression
            and visual presence during mock interviews.
          </p>

        </div>


        {/* PROGRESS */}

        <section className="section-title stats-title">

          <h2>
            Your Progress
          </h2>

        </section>


        <section className="stats-grid">

          <div className="stat-card">

            <span>
              Interviews
            </span>

            <strong>
              {totalInterviews}
            </strong>

            <small>
              Completed
            </small>

          </div>


          <div className="stat-card">

            <span>
              Questions
            </span>

            <strong>
              {totalQuestions}
            </strong>

            <small>
              Practiced
            </small>

          </div>


          <div className="stat-card">

            <span>
              Average Score
            </span>

            <strong>
              {averageScore}%
            </strong>

            <small>
              Overall performance
            </small>

          </div>


          <div className="stat-card">

            <span>
              Resume
            </span>

            <strong>
              {resumeUploaded
                ? `${resumeScore}%`
                : "--"}
            </strong>

            <small>
              {resumeUploaded
                ? "Resume Score"
                : "Not uploaded"}
            </small>

          </div>

        </section>


        {/* PERFORMANCE SUMMARY */}

        <section className="performance-summary">

          <div className="section-title">

            <h2>
              Performance Summary
            </h2>

            <p>
              Your interview practice overview.
            </p>

          </div>


          <div className="performance-cards">

            {/* EASY */}

            <div
              className="performance-card"
              onClick={() =>
                onPerformanceClick("Easy")
              }
            >

              <span>
                Easy Level
              </span>

              <strong>
                {performance.Easy.score}%
              </strong>

              <small>
                {performance.Easy.answered}
                {" / "}
                {performance.Easy.total}
                {" Answered"}
              </small>

            </div>


            {/* MEDIUM */}

            <div
              className="performance-card"
              onClick={() =>
                onPerformanceClick("Medium")
              }
            >

              <span>
                Medium Level
              </span>

              <strong>
                {performance.Medium.score}%
              </strong>

              <small>
                {performance.Medium.answered}
                {" / "}
                {performance.Medium.total}
                {" Answered"}
              </small>

            </div>


            {/* HARD */}

            <div
              className="performance-card"
              onClick={() =>
                onPerformanceClick("Hard")
              }
            >

              <span>
                Hard Level
              </span>

              <strong>
                {performance.Hard.score}%
              </strong>

              <small>
                {performance.Hard.answered}
                {" / "}
                {performance.Hard.total}
                {" Answered"}
              </small>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default Dashboard;
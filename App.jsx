import { useState, useEffect } from "react";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ResumeAnalysis from "./pages/ResumeAnalysis";
import InterviewQuestions from "./pages/InterviewQuestions";
import PerformanceReport from "./pages/PerformanceReport";
import MockInterview from "./pages/MockInterview";
import MockPerformanceReport from "./pages/MockPerformanceReport";
import LearningHub from "./pages/LearningHub";
import VisionAnalysis from "./pages/VisionAnalysis";
import InterviewHistory from "./pages/InterviewHistory";
import Settings from "./pages/Settings";

function App() {

  const [loggedIn, setLoggedIn] =
    useState(false);

  const [page, setPage] =
    useState("dashboard");

  const [selectedDifficulty, setSelectedDifficulty] =
    useState("Easy");


  /* PROFILE */

  const [profile, setProfile] = useState(() => {

    const savedProfile =
      localStorage.getItem(
        "clevonixProfile"
      );

    return savedProfile
      ? JSON.parse(savedProfile)
      : {
          name: "Candidate",
          role: "Student"
        };

  });


  useEffect(() => {

    localStorage.setItem(
      "clevonixProfile",
      JSON.stringify(profile)
    );

  }, [profile]);


  /* MOCK PERFORMANCE */

  const [mockPerformance, setMockPerformance] =
    useState({
      score: 0,
      answered: 0,
      total: 15
    });


  /* INTERVIEW PERFORMANCE */

  const [performance, setPerformance] =
    useState({

      Easy: {
        answered: 0,
        total: 5,
        score: 0,
        feedback: []
      },

      Medium: {
        answered: 0,
        total: 5,
        score: 0,
        feedback: []
      },

      Hard: {
        answered: 0,
        total: 5,
        score: 0,
        feedback: []
      }

    });


  /* INTERVIEW HISTORY */

  const [interviewHistory, setInterviewHistory] =
    useState([]);


  /* RESUME */

  const [resumeUploaded, setResumeUploaded] =
    useState(false);

  const [resumeScore, setResumeScore] =
    useState(0);


  /* CLEAR HISTORY */

  const clearInterviewHistory = () => {

    const confirmClear =
      window.confirm(
        "Are you sure you want to clear all interview history?"
      );

    if (confirmClear) {
      setInterviewHistory([]);
    }

  };


  /* LOGIN */

  if (!loggedIn) {

    return (
      <Login
        onLogin={() =>
          setLoggedIn(true)
        }
      />
    );

  }


  /* LEARNING */

  if (page === "learning") {

    return (
      <LearningHub
        onHomeClick={() =>
          setPage("dashboard")
        }
      />
    );

  }


  /* RESUME */

  if (page === "resume") {

    return (
      <ResumeAnalysis
        onHomeClick={() =>
          setPage("dashboard")
        }

        onResumeUploaded={(score) => {

          setResumeUploaded(true);

          if (score !== undefined) {
            setResumeScore(score);
          }

        }}
      />
    );

  }


  /* VISION */

  if (page === "vision") {

    return (
      <VisionAnalysis
        onHomeClick={() =>
          setPage("dashboard")
        }
      />
    );

  }


  /* QUESTIONS */

  if (page === "questions") {

    return (
      <InterviewQuestions

        onHomeClick={() =>
          setPage("dashboard")
        }

        initialDifficulty={
          selectedDifficulty
        }

        onFinish={(
          difficulty,
          answers,
          score,
          feedback
        ) => {

          setSelectedDifficulty(
            difficulty
          );


          const answered =
            answers.filter(
              (answer) =>
                answer &&
                answer.trim() !== ""
            ).length;


          const total =
            answers.length;


          setPerformance((prev) => ({

            ...prev,

            [difficulty]: {

              answered:
                answered,

              total:
                total,

              score:
                score,

              feedback:
                feedback || []

            }

          }));


          setInterviewHistory(
            (prev) => [

              ...prev,

              {
                difficulty:
                  difficulty,

                score:
                  score,

                answered:
                  answered,

                total:
                  total,

                date:
                  new Date().toLocaleString()
              }

            ]
          );


          setPage("report");

        }}

      />
    );

  }


  /* MOCK INTERVIEW */

  if (page === "mock") {

    return (
      <MockInterview

        onHomeClick={() =>
          setPage("dashboard")
        }

        onFinish={(
          score,
          answered,
          total
        ) => {

          setMockPerformance({

            score:
              score,

            answered:
              answered,

            total:
              total

          });


          setPage(
            "mockReport"
          );

        }}

      />
    );

  }


  /* MOCK REPORT */

  if (page === "mockReport") {

    return (
      <MockPerformanceReport

        performance={
          mockPerformance
        }

        onHomeClick={() =>
          setPage("dashboard")
        }

        onRetry={() =>
          setPage("mock")
        }

      />
    );

  }


  /* PERFORMANCE REPORT */

  if (page === "report") {

    return (
      <PerformanceReport

        data={
          performance
        }

        initialDifficulty={
          selectedDifficulty
        }

        onHomeClick={() =>
          setPage("dashboard")
        }

        onPracticeAgain={
          (level) => {

            setSelectedDifficulty(
              level
            );

            setPage(
              "questions"
            );

          }
        }

      />
    );

  }


  /* HISTORY */

  if (page === "history") {

    return (
      <InterviewHistory

        history={
          interviewHistory
        }

        onHomeClick={() =>
          setPage("dashboard")
        }

        onClearHistory={
          clearInterviewHistory
        }

      />
    );

  }


  /* SETTINGS */

  if (page === "settings") {

    return (
      <Settings

        onHomeClick={() =>
          setPage("dashboard")
        }

        profile={
          profile
        }

        setProfile={
          setProfile
        }

      />
    );

  }


  /* DASHBOARD */

  return (

    <Dashboard

      onResumeClick={() =>
        setPage("resume")
      }


      onQuestionsClick={() =>
        setPage("questions")
      }


      onPerformanceClick={
        (level) => {

          setSelectedDifficulty(
            level
          );

          setPage(
            "report"
          );

        }
      }


      onMockClick={() =>
        setPage("mock")
      }


      onLearningClick={() =>
        setPage("learning")
      }


      onVisionClick={() =>
        setPage("vision")
      }


      onHistoryClick={() =>
        setPage("history")
      }


      onSettingsClick={() =>
        setPage("settings")
      }


      profile={
        profile
      }


      performance={
        performance
      }


      interviewHistory={
        interviewHistory
      }


      resumeUploaded={
        resumeUploaded
      }


      resumeScore={
        resumeScore
      }


      onLogout={() =>
        setLoggedIn(false)
      }

    />

  );

}

export default App;
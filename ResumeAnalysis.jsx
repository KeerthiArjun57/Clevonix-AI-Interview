import { useState } from "react";
import "./ResumeAnalysis.css";

function ResumeAnalysis({
  onHomeClick,
  onResumeUploaded
}) {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [analysis, setAnalysis] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);
      setMessage("");
    }
  };

  const handleAnalyze = async () => {
    if (!file) {
      setMessage("Please upload your resume first.");
      return;
    }

    setMessage("Analyzing your resume...");

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const response = await fetch(
        "http://127.0.0.1:5000/analyze-resume",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();

      if (result.success) {
        console.log("Resume Analysis:", result.data);

        setAnalysis(result.data);

        // Tell App.jsx that resume was successfully uploaded
        if (onResumeUploaded) {
          onResumeUploaded(result.data.score);
        }

        setMessage(
          "Resume analyzed successfully! Check the browser console."
        );
      } else {
        setMessage(
          result.error || "Resume analysis failed."
        );
      }

    } catch (error) {
      console.error(error);

      setMessage(
        "Unable to connect to the Clevonix backend."
      );
    }
  };

  return (
    <div className="resume-page">

      <button
        className="home-button"
        onClick={onHomeClick}
      >
        ← HOME
      </button>


      {/* TOP HEADER */}

      <header className="resume-header">

        <div>
          <h1>Resume Analysis</h1>

          <p>
            Upload your resume and let Clevonix analyze your profile.
          </p>
        </div>

        <div className="resume-logo">
          CLEVONIX
        </div>

      </header>


      {/* MAIN CONTENT */}

      <div className="resume-content">


        {/* INTRO CARD */}

        <section className="resume-intro">

          <div className="resume-intro-icon">
            📄
          </div>

          <div>

            <h2>
              Analyze Your Resume
            </h2>

            <p>
              Our AI-powered system extracts your skills,
              education, projects and certifications from
              your resume.
            </p>

          </div>

        </section>


        {/* UPLOAD AREA */}

        <section className="upload-card">

          <h2>
            Upload Resume
          </h2>

          <p className="upload-description">
            Supported format: PDF
          </p>


          <label className="upload-area">

            <div className="upload-icon">
              ⬆
            </div>

            <h3>
              {file
                ? file.name
                : "Choose your resume"}
            </h3>

            <p>
              Click here to select your PDF resume
            </p>

            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
            />

          </label>


          {/* FILE INFORMATION */}

          {file && (
            <div className="file-info">

              <div>

                <strong>
                  Selected File
                </strong>

                <p>
                  {file.name}
                </p>

              </div>

              <span>
                ✓
              </span>

            </div>
          )}


          {/* ANALYZE BUTTON */}

          <button
            className="analyze-button"
            onClick={handleAnalyze}
          >
            Analyze Resume →
          </button>


          {/* MESSAGE */}

          {message && (
            <p className="upload-message">
              {message}
            </p>
          )}


          {/* ANALYSIS RESULT */}

          {analysis && (
            <section className="result-card">


              <div className="result-header">

                <h2>
                  Resume Analysis Result
                </h2>

                <span>
                  ✓ Analyzed
                </span>

              </div>


              {/* SCORE */}

              <div className="resume-score">

                <h3>
                  Resume Score
                </h3>

                <strong>
                  {analysis.score || 0}%
                </strong>

                <p>
                  Based on the information detected
                  in your resume.
                </p>

              </div>


              {/* PERSONAL INFORMATION */}

              <div className="personal-info">


                <div className="info-item">

                  <span>
                    👤 Name
                  </span>

                  <strong>
                    {analysis.name ||
                      "Not detected"}
                  </strong>

                </div>


                <div className="info-item">

                  <span>
                    📧 Email
                  </span>

                  <strong>
                    {analysis.email ||
                      "Not detected"}
                  </strong>

                </div>


                <div className="info-item">

                  <span>
                    📱 Phone
                  </span>

                  <strong>
                    {analysis.phone ||
                      "Not detected"}
                  </strong>

                </div>

              </div>


              {/* SKILLS */}

              <div className="result-section">

                <h3>
                  💻 Skills
                </h3>

                <div className="tag-container">

                  {analysis.skills &&
                  analysis.skills.length > 0 ? (

                    analysis.skills.map(
                      (skill, index) => (
                        <span
                          className="skill-tag"
                          key={index}
                        >
                          {skill}
                        </span>
                      )
                    )

                  ) : (

                    <p>
                      No skills detected.
                    </p>

                  )}

                </div>

              </div>


              {/* EDUCATION */}

              <div className="result-section">

                <h3>
                  🎓 Education
                </h3>

                {analysis.education &&
                analysis.education.length > 0 ? (

                  analysis.education.map(
                    (item, index) => (
                      <div
                        className="result-item"
                        key={index}
                      >
                        {item}
                      </div>
                    )
                  )

                ) : (

                  <p>
                    No education details detected.
                  </p>

                )}

              </div>


              {/* PROJECTS */}

              <div className="result-section">

                <h3>
                  🚀 Projects
                </h3>

                {analysis.projects &&
                analysis.projects.length > 0 ? (

                  analysis.projects.map(
                    (item, index) => (
                      <div
                        className="result-item"
                        key={index}
                      >
                        {item}
                      </div>
                    )
                  )

                ) : (

                  <p>
                    No project details detected.
                  </p>

                )}

              </div>


              {/* CERTIFICATIONS */}

              <div className="result-section">

                <h3>
                  🏆 Certifications
                </h3>

                {analysis.certifications &&
                analysis.certifications.length > 0 ? (

                  analysis.certifications.map(
                    (item, index) => (
                      <div
                        className="result-item"
                        key={index}
                      >
                        {item}
                      </div>
                    )
                  )

                ) : (

                  <p>
                    No certification details detected.
                  </p>

                )}

              </div>

            </section>
          )}

        </section>


        {/* WHAT WILL BE ANALYZED */}

        <section className="analysis-section">

          <h2>
            What Clevonix Will Analyze
          </h2>


          <div className="analysis-grid">


            <div className="analysis-card">

              <div>
                🎓
              </div>

              <h3>
                Education
              </h3>

              <p>
                Identify educational qualifications
                and academic details.
              </p>

            </div>


            <div className="analysis-card">

              <div>
                💻
              </div>

              <h3>
                Skills
              </h3>

              <p>
                Extract technical and professional
                skills from your resume.
              </p>

            </div>


            <div className="analysis-card">

              <div>
                🚀
              </div>

              <h3>
                Projects
              </h3>

              <p>
                Identify projects and technologies
                mentioned in your resume.
              </p>

            </div>


            <div className="analysis-card">

              <div>
                🏆
              </div>

              <h3>
                Certifications
              </h3>

              <p>
                Extract relevant certifications
                and achievements.
              </p>

            </div>

          </div>

        </section>

      </div>

    </div>
  );
}

export default ResumeAnalysis;
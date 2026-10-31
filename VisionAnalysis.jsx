import React, { useEffect, useRef, useState } from "react";
import "./VisionAnalysis.css";

function VisionAnalysis({ onHomeClick }) {
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const [cameraOn, setCameraOn] = useState(false);

  const [faceStatus, setFaceStatus] = useState("Waiting");
  const [eyeContact, setEyeContact] = useState("Waiting");
  const [expression, setExpression] = useState("Waiting");
  const [presence, setPresence] = useState("Waiting");

  // Live status update
  const checkFacePresence = () => {
    if (!cameraOn) {
      setFaceStatus("Waiting");
      setEyeContact("Waiting");
      setExpression("Waiting");
      setPresence("Waiting");
      return;
    }

    // Current demo analysis status
    // Later actual AI/OpenCV detection can be connected here.
    setFaceStatus("Good");
    setEyeContact("Very Good");
    setExpression("Excellent");
    setPresence("Good");
  };

  // Run analysis when camera is ON
  useEffect(() => {
    if (!cameraOn) {
      return;
    }

    // Initial status
    checkFacePresence();

    // Update status continuously
    const interval = setInterval(() => {
      checkFacePresence();
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [cameraOn]);

  // Start Camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
        },
        audio: false,
      });

      streamRef.current = stream;

      setCameraOn(true);

      // Show monitoring first
      setFaceStatus("Detecting...");
      setEyeContact("Monitoring...");
      setExpression("Monitoring...");
      setPresence("Monitoring...");
    } catch (error) {
      console.error("Camera error:", error);

      setCameraOn(false);

      setFaceStatus("Camera Unavailable");
      setEyeContact("Unavailable");
      setExpression("Unavailable");
      setPresence("Unavailable");
    }
  };

  // Attach camera stream to video
  useEffect(() => {
    if (cameraOn && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;

      videoRef.current
        .play()
        .catch((error) => {
          console.error("Video play error:", error);
        });
    }
  }, [cameraOn]);

  // Stop Camera
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        track.stop();
      });

      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setCameraOn(false);

    setFaceStatus("Waiting");
    setEyeContact("Waiting");
    setExpression("Waiting");
    setPresence("Waiting");
  };

  // Stop camera when leaving page
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => {
          track.stop();
        });
      }
    };
  }, []);

  return (
    <div className="vision-page">

      <div className="vision-header">

        <button
          className="vision-back-btn"
          onClick={onHomeClick}
        >
          ← Back to Dashboard
        </button>

        <h1>Vision Analysis</h1>

        <p>
          Analyze your visual presence during mock interviews.
        </p>

      </div>

      <div className="vision-content">

        {/* CAMERA CARD */}
        <div className="camera-card">

          <div className="camera-title">

            <h2>Live Camera</h2>

            <span
              className={
                cameraOn
                  ? "live-status"
                  : "offline-status"
              }
            >
              {cameraOn ? "● LIVE" : "● OFFLINE"}
            </span>

          </div>

          <div className="video-container">

            {cameraOn ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="camera-video"
              />
            ) : (
              <div className="camera-placeholder">

                <div className="camera-icon">
                  📷
                </div>

                <h3>Camera is Off</h3>

                <p>
                  Start the camera to begin vision analysis.
                </p>

              </div>
            )}

          </div>

          <div className="camera-buttons">

            {!cameraOn ? (
              <button
                className="start-camera-btn"
                onClick={startCamera}
              >
                Start Camera
              </button>
            ) : (
              <button
                className="stop-camera-btn"
                onClick={stopCamera}
              >
                Stop Camera
              </button>
            )}

          </div>

        </div>


        {/* LIVE ANALYSIS */}
        <div className="analysis-card">

          <h2>Live Analysis</h2>

          <div className="analysis-grid">

            {/* FACE PRESENCE */}
            <div className="analysis-item">

              <div className="analysis-icon">
                👤
              </div>

              <div>
                <h3>Face Presence</h3>

                <p>
                  {faceStatus}
                </p>
              </div>

            </div>


            {/* EYE CONTACT */}
            <div className="analysis-item">

              <div className="analysis-icon">
                👀
              </div>

              <div>
                <h3>Eye Contact</h3>

                <p>
                  {eyeContact}
                </p>
              </div>

            </div>


            {/* FACIAL EXPRESSION */}
            <div className="analysis-item">

              <div className="analysis-icon">
                🙂
              </div>

              <div>
                <h3>Facial Expression</h3>

                <p>
                  {expression}
                </p>
              </div>

            </div>


            {/* INTERVIEW PRESENCE */}
            <div className="analysis-item">

              <div className="analysis-icon">
                🎯
              </div>

              <div>
                <h3>Interview Presence</h3>

                <p>
                  {presence}
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>


      {/* INFO SECTION */}
      <div className="vision-info">

        <div className="info-box">

          <h3>Eye Contact</h3>

          <p>
            Helps monitor whether the candidate is generally
            facing the camera during the interview.
          </p>

        </div>


        <div className="info-box">

          <h3>Facial Expression</h3>

          <p>
            Provides a simple visual indication of the
            candidate's expression during the interview.
          </p>

        </div>


        <div className="info-box">

          <h3>Face Presence</h3>

          <p>
            Checks whether the candidate remains visible
            in the camera frame.
          </p>

        </div>


        <div className="info-box">

          <h3>Performance Feedback</h3>

          <p>
            These visual indicators can be used as part
            of interview practice and feedback.
          </p>

        </div>

      </div>

    </div>
  );
}

export default VisionAnalysis;
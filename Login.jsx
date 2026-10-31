import { useState } from "react";
import "../Login.css";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === "admin@gmail.com" && password === "12345") {
      setLoginError("");
      onLogin();
    } else {
      setLoginError("Invalid email or password.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">

        {/* LEFT SIDE */}
        <div className="login-left">
          <div className="logo">CLEVONIX</div>

          <h2>Prepare. Practice. Perform.</h2>

          <p>
            Your AI-powered platform for smarter
            interview preparation and better performance.
          </p>

          <div className="ai-box">
            <p>
              🤖 Resume Analysis &nbsp; • &nbsp;
              🎤 Mock Interviews &nbsp; • &nbsp;
              📊 Performance Insights
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="login-right">

          <h2>Welcome Back 👋</h2>

          <p className="login-subtitle">
            Login to continue your interview preparation.
          </p>

          <form className="login-form" onSubmit={handleLogin}>

            {/* EMAIL */}
            <label>Email Address</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setLoginError("");
              }}
              required
            />

            {/* PASSWORD */}
            <label>Password</label>

            <div className="password-wrapper">

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setLoginError("");
                }}
                required
              />

              <button
                type="button"
                className="show-password-button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? "Hide" : "Show"}
              </button>

            </div>

            {/* LOGIN ERROR */}
            {loginError && (
              <p className="login-error">
                {loginError}
              </p>
            )}

            {/* FORGOT PASSWORD */}
            <button
              type="button"
              className="forgot-password-button"
              onClick={() =>
                alert(
                  "Password reset link feature will be connected to the backend."
                )
              }
            >
              Forgot Password?
            </button>

            {/* LOGIN BUTTON */}
            <button
              className="login-button"
              type="submit"
            >
              Login
            </button>

          </form>

          {/* DEMO CREDENTIALS */}
          <div className="demo-credentials">
            <strong>Demo Login</strong>

            <span>
              Email: admin@gmail.com
            </span>

            <span>
              Password: 12345
            </span>
          </div>

          {/* FOOTER */}
          <p className="demo-login">
            Clevonix • AI-Powered Interview
            Preparation Platform
          </p>

        </div>
      </div>
    </div>
  );
}

export default Login;
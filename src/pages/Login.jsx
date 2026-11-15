import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadUserFavorites } from "../features/favoriteSlice";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const cleanEmail = email.trim().toLowerCase();

    try {
      // 1. Check backend server
      const response = await api.get("/users", {
        params: {
          email: cleanEmail,
          password
        }
      });

      let loggedInUser = response.data[0];

      // 2. If server restarted and wiped temporary db.json, check local backup
      if (!loggedInUser) {
        const localUsers = JSON.parse(localStorage.getItem("fashionHubRegisteredUsers")) || [];
        const backupUser = localUsers.find(
          (u) => u.email === cleanEmail && u.password === password
        );

        if (backupUser) {
          // Re-sync user back to server so API stays up to date
          const synced = await api.post("/users", backupUser);
          loggedInUser = synced.data || backupUser;
        }
      }

      if (loggedInUser) {
        localStorage.setItem("user", JSON.stringify(loggedInUser));
        dispatch(loadUserFavorites());
        navigate("/");
      } else {
        setError("Invalid email or password.");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Welcome Back</h1>
        <p>Login to your Fashion Hub account.</p>

        {location.state?.message && (
          <p className="auth-error">
            {location.state.message}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="auth-btn">
            Login
          </button>
        </form>

        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { registerUser, clearError } from "../../redux/slices/authSlice";
import styles from "./AuthForm.module.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user, navigate]);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser({ name, email, password }));
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2 className={styles.title}>Register</h2>

      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className={styles.input}
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className={styles.input}
      />

      <input
        type="password"
        placeholder="Password (min 4 chars)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className={styles.input}
      />

      <button type="submit" disabled={loading} className={styles.button}>
        {loading ? "Creating account..." : "Register"}
      </button>

      {error && <p className={styles.error}>{error}</p>}

      <p className={styles.footerText}>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </form>
  );
}

export default Register;

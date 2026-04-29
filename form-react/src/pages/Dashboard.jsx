import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
  // Read from Redux: total number of todos
  const totalTodos = useSelector((state) => state.todos.todos.length);

  // (Optional) read the user too
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="page-content">
      <h1>Dashboard</h1>
      <p>
        Welcome back{user ? `, ${user.name}` : ""}! Here's your overview.
      </p>

      <div className={styles.cardsRow}>
        <div className={styles.card}>
          <p className={styles.cardTitle}>Total Tasks</p>
          <p className={styles.cardValue}>{totalTodos}</p>
          <p className={styles.cardSubtext}>
            {totalTodos === 0
              ? "No tasks yet"
              : totalTodos === 1
              ? "task in your list"
              : "tasks in your list"}
          </p>
          <Link to="/todos" className={styles.viewLink}>
            View all →
          </Link>
        </div>
      </div>
    </div>
  );
}

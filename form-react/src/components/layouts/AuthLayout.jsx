import { Outlet } from "react-router-dom";
import styles from "./AuthLayout.module.css";

// AuthLayout = clean full-screen layout for login/register.
// No sidebar, no navbar, no footer. Just the form, centered.
function AuthLayout() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;

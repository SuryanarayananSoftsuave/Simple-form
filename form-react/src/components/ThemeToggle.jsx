import { useTheme } from "../context/ThemeContext";
import { FiSun, FiMoon } from "react-icons/fi";
import styles from "./ThemeToggle.module.css";

function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();
    const label = `Switch to ${theme === "light" ? "dark" : "light"} mode`;

    return (
        <button
            type="button"
            className={styles['theme-toggle']}
            onClick={toggleTheme}
            aria-label={label}
            title={label}
        >
            {theme === "light" ? <FiMoon /> : <FiSun />}
        </button>
    );
}

export default ThemeToggle;

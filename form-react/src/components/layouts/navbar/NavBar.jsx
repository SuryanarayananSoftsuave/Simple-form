import styles from "./NavBar.module.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../redux/slices/authSlice";
import ThemeToggle from "../../ThemeToggle";

function NavBar() {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles['nav-brand']}>
                <h1 className={styles['nav-title']}>React Application</h1>
            </div>

            <div className={styles['nav-links-center']}>
                <Link to="/">Home</Link>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/map">Map</Link>
            </div>

            <div className={styles['nav-links-right']}>
                <ThemeToggle />

                {user ? (
                    <>
                        <span className={styles['nav-user']}>Hi, {user.name}</span>
                        <button onClick={handleLogout} className={styles['nav-button']}>
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className={styles['nav-button']}>Login</Link>
                        <Link to="/register" className={styles['nav-button']}>Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default NavBar;

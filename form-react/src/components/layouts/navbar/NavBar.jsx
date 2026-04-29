import React from 'react';
import styles from "./NavBar.module.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../redux/slices/authSlice";

function NavBar() {
    // Read user from Redux store - any component can do this!
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
            <div className={styles['nav-links']}>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>

                {user ? (
                    <>
                        <span style={{ marginLeft: 12 }}>Hi, {user.name}</span>
                        <button onClick={handleLogout} style={{ marginLeft: 8, cursor: "pointer" }}>
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" style={{ marginLeft: 12 }}>Login</Link>
                        <Link to="/register" style={{ marginLeft: 8 }}>Register</Link>
                    </>
                )}
            </div>
        </nav>
    )
}

export default NavBar

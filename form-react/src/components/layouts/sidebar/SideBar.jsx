import styles from "./SideBar.module.css";
import { FiHome, FiUser, FiClipboard, FiSettings, FiCheckSquare, FiAirplay, FiVideo, FiMap } from "react-icons/fi";
import { Link } from "react-router-dom";

function SideBar({ isOpen, toggleSidebar }) {
    return (
        <aside className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}>
            <button className={styles['sidebar-toggle']} onClick={toggleSidebar}>
                {isOpen ? '<' : '>'}
            </button>
            {isOpen ? (
                <>
                    <h2 className={styles['sidebar-title']}>Sidebar</h2>
                    <nav className={styles['sidebar-nav']}>
                        <Link to="/dashboard" className={styles['nav-item']}>
                            <FiHome /> Dashboard
                        </Link>
                        <Link to="/profile" className={styles['nav-item']}>
                            <FiUser /> Profile
                        </Link>
                        <Link to="/forms" className={styles['nav-item']}>
                            <FiClipboard /> Forms
                        </Link>
                        <Link to="/todos" className={styles['nav-item']}>
                            <FiCheckSquare /> Todos
                        </Link>
                        <Link to="/movies" className={styles['nav-item']}>
                            <FiAirplay /> Movies
                        </Link>
                        <Link to="/map" className={styles['nav-item']}>
                            <FiMap /> Map
                        </Link>
                    </nav>
                </>
            ) : (
                <>
                <h2 className={styles['sidebar-title']}></h2>
                <nav className={styles['sidebar-nav-icons']}>
                    <Link to="/dashboard" title="Dashboard"><FiHome /></Link>
                    <Link to="/profile" title="Profile"><FiUser /></Link>
                    <Link to="/forms" title="Forms"><FiClipboard /></Link>
                    <Link to="/todos" title="Todos"><FiCheckSquare /></Link>
                    <Link to="/movies" title="Movies"><FiAirplay /></Link>
                    <Link to="/map" title="Map"><FiMap /></Link>
                </nav>
                </>
            )}
        </aside>
    )
}

export default SideBar;
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TodoModal from "./TodoModal";
import styles from "./Todos.module.css";

const VIEW_LIST = "list";
const VIEW_BOARD = "board";

const formatDateOnly = (val) => {
    if (!val) return "—";
    const d = new Date(val);
    if (Number.isNaN(d.getTime())) return val;
    return d.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "2-digit",
    });
};

const statusClassName = (status) =>
    `status_${(status || "Open").replace(/\s+/g, "_")}`;

function Todos() {
    const todos = useSelector((state) => state.todos.todos);

    const [view, setView] = useState(VIEW_LIST);
    const [modalState, setModalState] = useState({
        open: false,
        mode: "create",
        todo: null,
    });

    const openCreate = () => {
        setModalState({ open: true, mode: "create", todo: null });
    };

    useEffect(() => {
        const onKey = (e) => {
            const isOpenShortcut =
                (e.ctrlKey || e.metaKey) &&
                !e.shiftKey &&
                !e.altKey &&
                (e.key === "o" || e.key === "O");

            if (!isOpenShortcut) return;

            e.preventDefault();
            setModalState((prev) =>
                prev.open ? prev : { open: true, mode: "create", todo: null }
            );
        };

        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    const openView = (todo) => {
        setModalState({ open: true, mode: "view", todo });
    };

    const closeModal = () => {
        setModalState({ open: false, mode: "create", todo: null });
    };

    return (
        <div className="page-content">
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Todo List</h1>
                    <p className={styles.subtitle}>
                        Track your tasks with status, due dates and assignees.
                    </p>
                </div>
                <button
                    type="button"
                    className={styles.addBtn}
                    onClick={openCreate}
                    title="Add Todo (Ctrl+O)"
                >
                    + Add Todo
                    <span className={styles.kbdHint} aria-hidden="true">Ctrl+O</span>
                </button>
            </div>

            <div className={styles.tabs} role="tablist" aria-label="Todo views">
                <button
                    type="button"
                    role="tab"
                    aria-selected={view === VIEW_LIST}
                    className={`${styles.tabBtn} ${view === VIEW_LIST ? styles.tabBtnActive : ""}`}
                    onClick={() => setView(VIEW_LIST)}
                >
                    List
                </button>
                <button
                    type="button"
                    role="tab"
                    aria-selected={view === VIEW_BOARD}
                    className={`${styles.tabBtn} ${view === VIEW_BOARD ? styles.tabBtnActive : ""}`}
                    onClick={() => setView(VIEW_BOARD)}
                >
                    Board
                </button>
            </div>

            {view === VIEW_LIST ? (
                todos.length === 0 ? (
                    <div className={styles.emptyState}>
                        <p>No todos yet. Click <strong>Add Todo</strong> to create your first task.</p>
                    </div>
                ) : (
                    <div className={styles.tableWrapper}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Status</th>
                                    <th>Assignee</th>
                                    <th>Due Date</th>
                                    <th>Created</th>
                                </tr>
                            </thead>
                            <tbody>
                                {todos.map((todo) => (
                                    <tr
                                        key={todo.id}
                                        className={styles.row}
                                        onClick={() => openView(todo)}
                                        tabIndex={0}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter" || e.key === " ") {
                                                e.preventDefault();
                                                openView(todo);
                                            }
                                        }}
                                    >
                                        <td className={styles.cellTitle}>{todo.title}</td>
                                        <td>
                                            <span
                                                className={`${styles.statusBadge} ${styles[statusClassName(todo.status)] || ""}`}
                                            >
                                                {todo.status}
                                            </span>
                                        </td>
                                        <td className={styles.cellAssignee}>
                                            {todo.userName ? (
                                                <div className={styles.assignee}>
                                                    <span className={styles.assigneeName}>{todo.userName}</span>
                                                    {todo.userEmail && (
                                                        <span className={styles.assigneeEmail}>
                                                            {todo.userEmail}
                                                        </span>
                                                    )}
                                                </div>
                                            ) : (
                                                <span className={styles.muted}>Unassigned</span>
                                            )}
                                        </td>
                                        <td>{formatDateOnly(todo.dueDate)}</td>
                                        <td>{formatDateOnly(todo.creationDate)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )
            ) : (
                <div className={styles.boardPlaceholder}>
                    <h3>Board view</h3>
                    <p>Coming soon. Switch back to <strong>List</strong> to manage your todos.</p>
                </div>
            )}

            {modalState.open && (
                <TodoModal
                    onClose={closeModal}
                    todo={modalState.todo}
                    initialMode={modalState.mode}
                />
            )}
        </div>
    );
}

export default Todos;

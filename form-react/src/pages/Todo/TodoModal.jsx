import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

import {
    addTodo,
    updateTodo,
    deleteTodo,
    TODO_STATUSES,
} from "../../redux/slices/todoSlice";
import styles from "./TodoModal.module.css";

const QUILL_MODULES = {
    toolbar: [
        [{ header: [1, 2, 3, false] }, { size: [] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        ["blockquote", "code-block"],
        ["link"],
        [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
        [{ align: [] }, { indent: "-1" }, { indent: "+1" }],
        ["clean"],
    ],
};

const QUILL_FORMATS = [
    "header", "size",
    "bold", "italic", "underline", "strike",
    "color", "background",
    "blockquote", "code-block",
    "link",
    "list",
    "align", "indent",
];

const formatDate = (iso) => {
    if (!iso) return "—";
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    return d.toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
    });
};

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

const toDateInputValue = (val) => {
    if (!val) return "";
    const d = new Date(val);
    if (Number.isNaN(d.getTime())) return "";
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
};

const emptyForm = {
    title: "",
    status: "Open",
    dueDate: "",
    userName: "",
    userEmail: "",
    description: "",
};

function TodoModal({ onClose, todo, initialMode = "create" }) {
    const dispatch = useDispatch();
    const [mode, setMode] = useState(initialMode);

    const initialForm = useMemo(() => {
        if (!todo) return emptyForm;
        return {
            title: todo.title ?? "",
            status: todo.status ?? "Open",
            dueDate: toDateInputValue(todo.dueDate),
            userName: todo.userName ?? "",
            userEmail: todo.userEmail ?? "",
            description: todo.description ?? "",
        };
    }, [todo]);

    const [form, setForm] = useState(initialForm);

    useEffect(() => {
        setForm(initialForm);
    }, [initialForm]);

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [onClose]);

    const isView = mode === "view";
    const isEdit = mode === "edit";
    const isCreate = mode === "create";

    const handleField = (key) => (e) => {
        setForm((prev) => ({ ...prev, [key]: e.target.value }));
    };

    const handleDescription = (value) => {
        setForm((prev) => ({ ...prev, description: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!form.title.trim()) return;

        const payload = {
            title: form.title.trim(),
            status: form.status,
            dueDate: form.dueDate || "",
            userName: form.userName.trim(),
            userEmail: form.userEmail.trim(),
            description: form.description,
        };

        if (isCreate) {
            dispatch(addTodo(payload));
        } else if (isEdit && todo) {
            dispatch(updateTodo({ id: todo.id, ...payload }));
        }

        onClose();
    };

    const handleDelete = () => {
        if (!todo) return;
        const ok = window.confirm(`Delete todo "${todo.title}"?`);
        if (!ok) return;
        dispatch(deleteTodo(todo.id));
        onClose();
    };

    const headerTitle = isCreate
        ? "Add Todo"
        : isEdit
            ? "Edit Todo"
            : "Todo Details";

    return (
        <div className={styles.backdrop} onClick={onClose}>
            <div
                className={styles.modal}
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="todo-modal-title"
            >
                <div className={styles.header}>
                    <h2 id="todo-modal-title" className={styles.title}>
                        {headerTitle}
                    </h2>
                    <button
                        type="button"
                        className={styles.closeBtn}
                        onClick={onClose}
                        aria-label="Close"
                    >
                        ×
                    </button>
                </div>

                {isView && todo ? (
                    <div className={styles.viewBody}>
                        <div className={styles.viewRow}>
                            <span className={styles.viewLabel}>Title</span>
                            <span className={styles.viewValue}>{todo.title}</span>
                        </div>

                        <div className={styles.viewGrid}>
                            <div className={styles.viewRow}>
                                <span className={styles.viewLabel}>Status</span>
                                <span
                                    className={`${styles.statusBadge} ${styles[`status_${todo.status.replace(/\s+/g, "_")}`] || ""}`}
                                >
                                    {todo.status}
                                </span>
                            </div>
                            <div className={styles.viewRow}>
                                <span className={styles.viewLabel}>Due Date</span>
                                <span className={styles.viewValue}>{formatDateOnly(todo.dueDate)}</span>
                            </div>
                            <div className={styles.viewRow}>
                                <span className={styles.viewLabel}>Created</span>
                                <span className={styles.viewValue}>{formatDate(todo.creationDate)}</span>
                            </div>
                            <div className={styles.viewRow}>
                                <span className={styles.viewLabel}>User Name</span>
                                <span className={styles.viewValue}>{todo.userName || "—"}</span>
                            </div>
                            <div className={styles.viewRow}>
                                <span className={styles.viewLabel}>User Email</span>
                                <span className={styles.viewValue}>{todo.userEmail || "—"}</span>
                            </div>
                        </div>

                        <div className={styles.viewRow}>
                            <span className={styles.viewLabel}>Description</span>
                            <div
                                className={`${styles.descriptionView} ql-editor`}
                                dangerouslySetInnerHTML={{
                                    __html: todo.description || "<p><em>No description provided.</em></p>",
                                }}
                            />
                        </div>

                        <div className={styles.actions}>
                            <button
                                type="button"
                                className={styles.deleteBtn}
                                onClick={handleDelete}
                            >
                                Delete
                            </button>
                            <button
                                type="button"
                                className={styles.editBtn}
                                onClick={() => setMode("edit")}
                            >
                                Edit
                            </button>
                            <button
                                type="button"
                                className={styles.secondaryBtn}
                                onClick={onClose}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={`${styles.field} ${styles.fieldFull}`}>
                            <label htmlFor="todo-title" className={styles.label}>
                                Title
                            </label>
                            <input
                                id="todo-title"
                                type="text"
                                className={styles.input}
                                placeholder="Enter todo title"
                                value={form.title}
                                onChange={handleField("title")}
                                required
                            />
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="todo-status" className={styles.label}>
                                Status
                            </label>
                            <select
                                id="todo-status"
                                className={styles.input}
                                value={form.status}
                                onChange={handleField("status")}
                            >
                                {TODO_STATUSES.map((s) => (
                                    <option key={s} value={s}>{s}</option>
                                ))}
                            </select>
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="todo-due" className={styles.label}>
                                Due Date
                            </label>
                            <input
                                id="todo-due"
                                type="date"
                                className={styles.input}
                                value={form.dueDate}
                                onChange={handleField("dueDate")}
                            />
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="todo-user-name" className={styles.label}>
                                User Name
                            </label>
                            <input
                                id="todo-user-name"
                                type="text"
                                className={styles.input}
                                placeholder="Assignee name"
                                value={form.userName}
                                onChange={handleField("userName")}
                            />
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="todo-user-email" className={styles.label}>
                                User Email
                            </label>
                            <input
                                id="todo-user-email"
                                type="email"
                                className={styles.input}
                                placeholder="assignee@example.com"
                                value={form.userEmail}
                                onChange={handleField("userEmail")}
                            />
                        </div>

                        {isEdit && todo && (
                            <div className={`${styles.field} ${styles.fieldFull}`}>
                                <span className={styles.label}>Created</span>
                                <span className={styles.metaValue}>
                                    {formatDate(todo.creationDate)}
                                </span>
                            </div>
                        )}

                        <div className={`${styles.field} ${styles.fieldFull}`}>
                            <label className={styles.label}>Description</label>
                            <div className={styles.editorWrapper}>
                                <ReactQuill
                                    theme="snow"
                                    value={form.description}
                                    onChange={handleDescription}
                                    modules={QUILL_MODULES}
                                    formats={QUILL_FORMATS}
                                    placeholder="Write a detailed description..."
                                />
                            </div>
                        </div>

                        <div className={styles.actions}>
                            {isEdit && (
                                <button
                                    type="button"
                                    className={styles.deleteBtn}
                                    onClick={handleDelete}
                                >
                                    Delete
                                </button>
                            )}
                            <button
                                type="button"
                                className={styles.secondaryBtn}
                                onClick={isEdit ? () => setMode("view") : onClose}
                            >
                                Cancel
                            </button>
                            <button type="submit" className={styles.primaryBtn}>
                                {isCreate ? "Create Todo" : "Save Changes"}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}

export default TodoModal;

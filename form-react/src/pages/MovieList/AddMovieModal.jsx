import { useState } from "react";
import { useDispatch } from "react-redux";
import { addMovie, editMovie } from "../../redux/slices/movieSlice";
import styles from "./AddMovieModal.module.css";

function AddMovieModal({ onClose, selectedMovie }) {
    const dispatch = useDispatch();
    const isEditing = Boolean(selectedMovie);

    const [title, setTitle] = useState(selectedMovie?.title ?? "");
    const [year, setYear] = useState(selectedMovie?.year ?? "");
    const [rating, setRating] = useState(selectedMovie?.rating ?? "");
    const [genre, setGenre] = useState(selectedMovie?.genre ?? "");
    const [director, setDirector] = useState(selectedMovie?.director ?? "");
    const [actors, setActors] = useState(selectedMovie?.actors ?? "");
    const [plot, setPlot] = useState(selectedMovie?.plot ?? "");

    const handleSubmit = (e) => {
        e.preventDefault();

        const movieData = {
            id: isEditing ? selectedMovie.id : Date.now(),
            title,
            year,
            rating,
            genre,
            director,
            actors,
            plot,
        };

        if (isEditing) {
            dispatch(editMovie(movieData));
        } else {
            dispatch(addMovie(movieData));
        }

        onClose();
    };

    return (
        <div className={styles['movie-modal']} onClick={onClose}>
            <div className={styles['movie-modal-content']} onClick={(e) => e.stopPropagation()}>
                <div className={styles['movie-modal-header']}>
                    <h2 className={styles['movie-modal-title']}>
                        {isEditing ? "Edit Movie" : "Add Movie"}
                    </h2>
                    <button onClick={onClose} className={styles['movie-modal-close-button']}>X</button>
                </div>

                <form onSubmit={handleSubmit} className={styles['movie-modal-form']}>
                    <div className={styles['movie-modal-field']}>
                        <label htmlFor="title" className={styles['movie-modal-label']}>Title</label>
                        <input 
                            type="text" 
                            id="title" 
                            placeholder="Title" 
                            className={styles['movie-modal-input']} 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)} 
                            required
                        />
                    </div>
                    <div className={styles['movie-modal-field']}>
                        <label htmlFor="year" className={styles['movie-modal-label']}>Year</label>
                        <input 
                            type="number" 
                            id="year" 
                            placeholder="Year" 
                            className={styles['movie-modal-input']} 
                            value={year} 
                            onChange={(e) => setYear(e.target.value)} 
                            required
                        />
                    </div>
                    <div className={styles['movie-modal-field']}>
                        <label htmlFor="rating" className={styles['movie-modal-label']}>Rating</label>
                        <input 
                            type="number" 
                            id="rating" 
                            placeholder="Rating" 
                            className={styles['movie-modal-input']} 
                            value={rating} 
                            onChange={(e) => setRating(e.target.value)} 
                            required
                        />
                    </div>
                    <div className={styles['movie-modal-field']}>
                        <label htmlFor="genre" className={styles['movie-modal-label']}>Genre</label>
                        <input 
                            type="text" 
                            id="genre" 
                            placeholder="Genre" 
                            className={styles['movie-modal-input']} 
                            value={genre} 
                            onChange={(e) => setGenre(e.target.value)} 
                            required
                        />
                    </div>
                    <div className={styles['movie-modal-field']}>
                        <label htmlFor="director" className={styles['movie-modal-label']}>Director</label>
                        <input 
                            type="text" 
                            id="director" 
                            placeholder="Director" 
                            className={styles['movie-modal-input']} 
                            value={director} 
                            onChange={(e) => setDirector(e.target.value)} 
                            required
                        />
                    </div>
                    <div className={styles['movie-modal-field']}>
                        <label htmlFor="actors" className={styles['movie-modal-label']}>Actors</label>
                        <input 
                            type="text" 
                            id="actors" 
                            placeholder="Actors" 
                            className={styles['movie-modal-input']} 
                            value={actors} 
                            onChange={(e) => setActors(e.target.value)} 
                            required
                        />
                    </div>
                    <div className={styles['movie-modal-field']}>
                        <label htmlFor="plot" className={styles['movie-modal-label']}>Plot</label>
                        <input 
                            type="text" 
                            id="plot" 
                            placeholder="Plot" 
                            className={styles['movie-modal-input']} 
                            value={plot} 
                            onChange={(e) => setPlot(e.target.value)} 
                            required
                        />
                    </div>
                    <button type="submit" className={styles['movie-modal-button']}>
                        {isEditing ? "Save Changes" : "Add Movie"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddMovieModal;

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeMovie } from "../../redux/slices/movieSlice";
import AddMovieModal from "./AddMovieModal";
import styles from "./MovieList.module.css";


export default function MovieList() {
    const movies = useSelector(state => state.movies.movieList);
    const dispatch = useDispatch();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);

    const handleOpenModal = () => {
        setSelectedMovie(null);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedMovie(null);
    };

    const handleEditMovie = (id) => {
        const movie = movies.find(m => m.id === id);
        setSelectedMovie(movie);
        setIsModalOpen(true);
    };

    const handleDeleteMovie = (id) => {
        dispatch(removeMovie(id));
    };

    return (
        <div className="page-content">
            <div className={styles['page-content-header']}>
                <h1 className={styles['page-content-title']}>Movie List</h1>
                <button className={styles['add-movie-button']} onClick={handleOpenModal}>Add Movie</button>
            </div>

            <div className={styles['movie-list']}>
                {isModalOpen && (
                    <AddMovieModal
                        onClose={handleCloseModal}
                        selectedMovie={selectedMovie}
                    />
                )}
                {movies.map(movie => (
                    <div key={movie.id} className={styles['movie-card']}>
                        <div className={styles['card-header']}>
                            <h2 className={styles['movie-title']}>{movie.title}</h2>
                            <div className={styles['card-actions']}>
                                <button
                                    className={styles['edit-movie-button']}
                                    onClick={() => handleEditMovie(movie.id)}
                                >
                                    Edit
                                </button>
                                <button
                                    className={styles['delete-movie-button']}
                                    onClick={() => handleDeleteMovie(movie.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>

                        <div className={styles['movie-info-horizontal']}>
                            <p className={styles['movie-year']}><strong>Year:</strong> {movie.year}</p>
                            <p className={styles['movie-rating']}><strong>Rating:</strong> {movie.rating}</p>
                        </div>

                        <p className={styles['movie-director']}><strong>Director:</strong> {movie.director}</p>
                        <p className={styles['movie-genre']}><strong>Genre:</strong> {movie.genre}</p>
                        <p className={styles['movie-actors']}><strong>Actors:</strong> {movie.actors}</p>
                        <p className={styles['movie-plot']}><strong>Plot:</strong> {movie.plot}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

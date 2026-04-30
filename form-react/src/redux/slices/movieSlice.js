import { createSlice } from "@reduxjs/toolkit";

const seedMovies = [
    {
        id: 1,
        title: "The Dark Knight",
        year: 2008,
        rating: 9.0,
        genre: "Action, Crime, Drama",
        director: "Christopher Nolan",
        actors: "Christian Bale, Heath Ledger, Aaron Eckhart",
        plot: "When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham. The Dark Knight must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    },
    {
        id: 2,
        title: "Inception",
        year: 2010,
        rating: 8.8,
        genre: "Action, Adventure, Sci-Fi",
        director: "Christopher Nolan",
        actors: "Leonardo DiCaprio, Joseph Gordon-Levitt, Elliot Page",
        plot: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.",
    },
    {
        id: 3,
        title: "Interstellar",
        year: 2014,
        rating: 8.7,
        genre: "Adventure, Drama, Sci-Fi",
        director: "Christopher Nolan",
        actors: "Matthew McConaughey, Anne Hathaway, Jessica Chastain",
        plot: "When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans.",
    },
    {
        id: 4,
        title: "The Godfather",
        year: 1972,
        rating: 9.2,
        genre: "Crime, Drama",
        director: "Francis Ford Coppola",
        actors: "Marlon Brando, Al Pacino, James Caan",
        plot: "The aging patriarch of an organized crime dynasty in postwar New York City transfers control of his clandestine empire to his reluctant youngest son.",
    },
    {
        id: 5,
        title: "Pulp Fiction",
        year: 1994,
        rating: 8.9,
        genre: "Crime, Drama",
        director: "Quentin Tarantino",
        actors: "John Travolta, Uma Thurman, Samuel L. Jackson",
        plot: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    },
    {
        id: 6,
        title: "The Matrix",
        year: 1999,
        rating: 8.7,
        genre: "Action, Sci-Fi",
        director: "Lana & Lilly Wachowski",
        actors: "Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss",
        plot: "When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth—the life he knows is the elaborate deception of an evil cyber-intelligence.",
    },
    {
        id: 7,
        title: "Forrest Gump",
        year: 1994,
        rating: 8.8,
        genre: "Drama, Romance",
        director: "Robert Zemeckis",
        actors: "Tom Hanks, Robin Wright, Gary Sinise",
        plot: "The history of the United States from the 1950s to the '70s unfolds from the perspective of an Alabama man with an IQ of 75, who yearns to be reunited with his childhood sweetheart.",
    },
    {
        id: 8,
        title: "Parasite",
        year: 2019,
        rating: 8.5,
        genre: "Drama, Thriller",
        director: "Bong Joon-ho",
        actors: "Song Kang-ho, Lee Sun-kyun, Cho Yeo-jeong",
        plot: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
    },
];

const loadFromStorage = () => {
    try {
        const data = localStorage.getItem("movies");
        if (data) return JSON.parse(data);
        localStorage.setItem("movies", JSON.stringify(seedMovies));
        return seedMovies;
    } catch {
        return seedMovies;
    }
};

const saveToStorage = (movies) => {
    localStorage.setItem("movies", JSON.stringify(movies));
};

const initialState = {
    movieList: loadFromStorage(),
};

const movieSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        addMovie: (state, action) => {
            state.movieList.push(action.payload);
            saveToStorage(state.movieList);
        },
        editMovie: (state, action) => {
            const index = state.movieList.findIndex(
                (movie) => movie.id === action.payload.id
            );
            if (index !== -1) {
                state.movieList[index] = action.payload;
                saveToStorage(state.movieList);
            }
        },
        removeMovie: (state, action) => {
            state.movieList = state.movieList.filter(
                (movie) => movie.id !== action.payload
            );
            saveToStorage(state.movieList);
        },
    },
});

export const { addMovie, editMovie, removeMovie } = movieSlice.actions;
export default movieSlice.reducer;

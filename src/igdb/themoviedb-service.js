import axios from "axios";

const API_KEY = process.env.REACT_APP_THEMOVIEDB_API_KEY;


export const getMovie = async (id) => {
    const response = await axios.get(
        `
https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&external_source=imdb_id`
    );
    return response.data;
}

export const getMovieSearch = async (query) => {
    const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
    );
    return response.data.results;
}

export const getTopMovies = async () => {
    const response = await axios.get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&page=1`
    );
    return response.data.results;
}

export const getPopularMovies = async () => {
    const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=1`
    );
    return response.data.results;
}

export const getUpcomingMovies = async () => {
    const response = await axios.get(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&page=1`
    );
    return response.data.results;
}


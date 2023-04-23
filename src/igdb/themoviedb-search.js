import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {getMovieSearch, getPopularMovies, getTopMovies, getUpcomingMovies} from "./themoviedb-service";
import MovieCardWithTitle from "../screens/movieCardWithTitle";
function IGDBSearchScreen() {
    const { searchTerm } = useParams();
    const [search, setSearch] = useState(searchTerm);
    const [results, setResults] = useState([]);
    const navigate = useNavigate();
    const searchMovies = async () => {
        const response = await getMovieSearch(search);
        if (response.length === 0) {
            navigate(`/themoviedb/search/`);
            alert("no data found!")
        }
        else {
            setResults(response);
            navigate(`/themoviedb/search/${search}`);
        }
    };

    const [topResults, setTopResults] = useState([]);
    const [popularResults, setPopularResults] = useState([]);
    const [upcomingResults, setUpcomingResults] = useState([]);
    const renderMovies = async () => {
        const response1 = await getTopMovies();
        const response2 = await getPopularMovies();
        const response3 = await getUpcomingMovies();
        setTopResults(response1);
        setPopularResults(response2);
        setUpcomingResults(response3)
    };

    useEffect(() => {
        if (searchTerm) {
            searchMovies();
        } else {
            renderMovies()
        }
    }, [searchTerm]);

    return (
        <div className="myTitleColor">
            {/*<h1 className="myTextColor">Movie Search</h1>*/}
            <div className="d-flex align-items-center mt-3">
                <input type="text" className="form-control me-2" placeholder="search..."
                       value={search}
                       onChange={(e) => setSearch(e.target.value)}/>
                <button className="btn btn-primary" onClick={searchMovies}>search</button>
            </div>

            {searchTerm && <div className="table-responsive">
                {results && <MovieCardWithTitle movieList={results} headerString={"Search result for \"" + searchTerm + "\""}/>}
            </div>}
            {!searchTerm && <div>
                {popularResults && <MovieCardWithTitle movieList={popularResults} headerString="Popular Movies"/>}
                {topResults && <MovieCardWithTitle movieList={topResults} headerString="Top rated Movies"/>}
                {upcomingResults && <MovieCardWithTitle movieList={upcomingResults} headerString="Upcoming Movies"/>}
            </div>}
        </div>
    );
}

export default IGDBSearchScreen;
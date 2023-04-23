import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {getPopularMovies, getTopMovies, getUpcomingMovies} from "./themoviedb-service";
import {useSelector} from "react-redux";
import MovieCard from "../screens/movieCard";
import MovieCardWithTitle from "../screens/movieCardWithTitle";
import {Card, ListGroup} from "react-bootstrap";
import {deleteReview, findAllReviews, findMyReviews} from "../services/review-service";
function TMDBMainScreen() {
    const { currentUser } = useSelector((state) => state.user);
    const [topResults, setTopResults] = useState([]);
    const [popularResults, setPopularResults] = useState([]);
    const [upcomingResults, setUpcomingResults] = useState([]);
    const [userReviews, setUserReviews] = useState([]);
    const [allReviews, setAllReviews] = useState([]);
    const renderMovies = async () => {
        const response1 = await getTopMovies();
        const response2 = await getPopularMovies();
        const response3 = await getUpcomingMovies();
        setTopResults(response1);
        setPopularResults(response2);
        setUpcomingResults(response3)
    };
    const getMyReview = async () => {
        if (!currentUser || !currentUser._id) {
            return
        }
        const response = await findMyReviews(currentUser._id);
        setUserReviews(response);
    };
    const getAllReview = async () => {
        if (currentUser) {
            return
        }
        const response = await findAllReviews();
        setAllReviews(response);
    };

    useEffect(() => {
        renderMovies();
        getAllReview()
    }, []);

    useEffect(() => {
        getMyReview()
    }, [currentUser]);

    return (
        <div className="myTitleColor">
            {currentUser && currentUser.bookmarks && <div className="mt-3">
                {currentUser.bookmarks.length !== 0 && <div>
                    <MovieCard movieList={currentUser.bookmarks} headerString="From your bookmarks"/>
                </div>}
                {currentUser.bookmarks.length === 0 && <div>
                    <Card className="mt-3">
                        <Card.Header>From your bookmarks</Card.Header>
                        <ListGroup variant="flush">
                            <ListGroup.Item>You don't have any bookmark, search and add you favorite movies！
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </div>}
                {currentUser && userReviews && <div className="mt-3">
                    <Card>
                        <Card.Header>Your recent reviews</Card.Header>
                        <ListGroup variant="flush">
                            {userReviews.length !== 0 && userReviews.map((review) => (
                                <ListGroup.Item key={review._id}>
                                    <Link to={`/details/${review.movieId}`} className="link-hover">
                                        {review.movieName}
                                    </Link>
                                    <div className="d-flex">
                                        You said: {review.text}
                                        {(currentUser && (currentUser.role === 'admin' || currentUser._id === review.user)) &&
                                            <button className="ms-auto btn btn-danger" onClick={() => {
                                                deleteReview(review._id)
                                                window.location.reload()
                                            }}>delete</button>}
                                    </div>
                                </ListGroup.Item>
                            ))}
                            {userReviews.length === 0 &&
                                <ListGroup.Item key="1121">
                                    You don't have any review. Find movies you like to post one!
                                </ListGroup.Item>
                            }
                        </ListGroup>
                    </Card>
                </div>}
            </div>}
            {!currentUser && allReviews && allReviews.length!==0 && <div className="mt-3">
                <Card>
                    <Card.Header>Members recent reviews</Card.Header>
                    <ListGroup variant="flush">
                        {allReviews.length !== 0 && allReviews.map((review) => (
                            <ListGroup.Item key={review._id}>
                                <Link to={`/details/${review.movieId}`} className="link-hover">
                                    {review.movieName}
                                </Link>
                                <div className="d-flex">
                                    <Link to={`/profile/${review.user}`} >{review.username}</Link>&nbsp;said: {review.text}
                                    {(currentUser && (currentUser.role === 'admin' || currentUser._id === review.user)) &&
                                        <button className="ms-auto btn btn-danger" onClick={() => {
                                            deleteReview(review._id)
                                            window.location.reload()
                                        }}>delete</button>}
                                </div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Card>
            </div>}

            {popularResults && <MovieCardWithTitle movieList={popularResults} headerString="Popular Movies"/>}
            {topResults && <MovieCardWithTitle movieList={topResults} headerString="Top rated Movies"/>}
            {upcomingResults && <MovieCardWithTitle movieList={upcomingResults} headerString="Upcoming Movies"/>}

        </div>
    );
}

export default TMDBMainScreen;
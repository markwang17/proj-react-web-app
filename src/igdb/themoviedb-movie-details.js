import React, { useState, useEffect } from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import { getMovie } from "./themoviedb-service";
import {createReview, deleteReview, findReviewForMovie} from "../services/review-service";
import {useDispatch, useSelector} from "react-redux";
import {profileThunk, updateUserThunk} from "../services/user-thunks";
import {addBookmark, follow, removeBookmark, unfollow} from "../services/user-service";
import {Card, ListGroup} from "react-bootstrap";

function ThemoviedbMovieDetails() {
    const { currentUser } = useSelector((state) => state.user);
    // const [profile, setProfile] = useState(currentUser);
    // const dispatch = useDispatch();
    const navigate = useNavigate();

    const { id } = useParams();
    const [movie, setMovie] = useState({});
    const [review, setReview] = useState("");
    const [reviews, setReviews] = useState([]);
    const postReview = async () => {
        if (!review) {
            alert("text cannot be empty")
            return
        }
        const newReview = await createReview({
            text: review,
            movieId: id,
            movieName: movie.title,
            user: currentUser._id,
            username: currentUser.username
        });
        window.location.reload()
    };
    const getMovieReviews = async () => {
        const response = await findReviewForMovie(id);
        setReviews(response);
    };

    useEffect(() => {
        const fetchMovie = async () => {
            const response = await getMovie(id);
            setMovie(response);
        };
        fetchMovie();
        getMovieReviews();

        // const handleProfileFetch = async () => {
        //     try {
        //         const { payload } = await dispatch(profileThunk());
        //     } catch (e) {
        //     }
        // };
        // handleProfileFetch();
    }, [id]);

    const findIfBookmarked = () => {
        if (!currentUser || !currentUser.bookmarks) {
            return
        }
        const res = currentUser.bookmarks.find((followingData) => followingData.movieId.toString() === id.toString())
        return !!res;
    }

    const handleAddBookmark = async () => {
        try {
            await addBookmark(id, movie.poster_path)
            window.location.reload()
        } catch (e) {
            alert(e.message);
        }
    };

    const handleRemoveBookmark = async () => {
        try {
            await removeBookmark(id)
            window.location.reload()
        } catch (e) {
            alert(e.message);
        }
    };

    return (
        <div className="tmdb-album-details">

            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-4">
                        {/*<img src={"https://image.tmdb.org/t/p/w500"+movie.poster_path} alt="Poster"*/}
                        {/*     className="img-fluid"/>*/}
                        {movie.poster_path && <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} className="img-fluid"/>}
                        {!movie.poster_path && <img src={process.env.PUBLIC_URL + "/200x300.png"} alt="poster not found" className="img-fluid"/>}
                    </div>
                    <div className="col-md-8">
                        <h1 className="display-4 fw-bold">{movie.title}</h1>
                        {movie.tagline && <p className="lead fst-italic fs-5">{movie.tagline}</p>}
                        {movie.overview && <div className="lead"><span className="fw-bold">Overview:</span> <div className="mx-3 my-2 fs-5">&nbsp;&nbsp;&nbsp;&nbsp;{movie.overview}</div></div>}
                        {movie.genres && movie.genres.length !== 0 && <p className="lead"><span className="fw-bold">Genres:</span> {movie.genres.map(genre => genre.name).join(", ")}</p>}
                        {movie.release_date && <p className="lead"><span className="fw-bold">Release Date:</span> {movie.release_date}</p>}
                        {movie.runtime && <p className="lead"><span className="fw-bold">Runtime:</span> {movie.runtime} minutes</p>}
                        {/*{movie.popularity && <p className="lead">Popularity: {movie.popularity}</p>}*/}
                        {movie.vote_average !== 0 && <p className="lead"><span className="fw-bold">Vote Average:</span> {movie.vote_average}/10.0</p>}
                        {/*{movie.vote_count && <p className="lead">Vote Count: {movie.vote_count}</p>}*/}
                        <div className="d-flex">
                            {movie.homepage && <a href={movie.homepage} className="btn btn-primary mx-auto"
                                target="_blank">Movie Homepage</a>}
                            {currentUser && currentUser.bookmarks && findIfBookmarked() && <button onClick={handleRemoveBookmark} className="btn btn-success ms-2 mx-auto">remove bookmark</button>}
                            {currentUser && currentUser.bookmarks && !findIfBookmarked() && <button onClick={handleAddBookmark} className="btn btn-success ms-2 mx-auto">add bookmark</button>}
                        </div>
                    </div>
                </div>
            </div>

            <h2 className="mt-3">Reviews</h2>
            {currentUser && (
                <div>
                    <textarea
                      onChange={(e) => setReview(e.target.value)}
                      className="form-control"
                    ></textarea>
                    <button onClick={postReview} className="btn btn-success mt-3">
                        Post Review
                    </button>
                </div>
            )}
            {!currentUser && (
                <div>
                    <textarea
                        className="form-control" disabled placeholder="Please log in to leave a comment"
                    ></textarea>
                    <button className="btn btn-primary mt-3" onClick={()=>{
                        navigate("/login")
                    }}>
                        Log in
                    </button>
                </div>
            )}
            {reviews && reviews.length!==0 && <div className="mt-3">
                <Card>
                    <ListGroup variant="flush">
                        {reviews.length !== 0 && reviews.map((review) => (
                            <ListGroup.Item key={review._id}>
                                {/*<Link to={`/details/${review.movieId}`} className="link-hover">*/}
                                {/*    {review.movieName}*/}
                                {/*</Link>*/}
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
        </div>
    );
}

export default ThemoviedbMovieDetails;
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import {deleteReview, findMyReviews} from "../services/review-service";
import {
    profileThunk,
    logoutThunk,
    updateUserThunk,
} from "../services/user-thunks";
import {Card, ListGroup} from "react-bootstrap";
import "react-responsive-carousel/lib/styles/carousel.min.css"
import MovieCard from "./movieCard";

function ProfileScreen() {
    const { currentUser } = useSelector((state) => state.user);
    const [profile, setProfile] = useState(currentUser);
    const [reviews, setReviews] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const save = () => {
        dispatch(updateUserThunk(profile));
    };
    const getMyReview = async () => {
        if (!currentUser || !currentUser._id) {
            return
        }
        const response = await findMyReviews(currentUser._id);
        setReviews(response);
    };

    useEffect(() => {
        const handleProfileFetch = async () => {
            try {
                const { payload } = await dispatch(profileThunk());
                setProfile(payload);
            } catch (e) {
            }
        };
        handleProfileFetch();
    }, []);

    useEffect(() => {
        getMyReview();
    }, [currentUser])

    return (
        <div>
            {!profile && (<div className="myTitleColor fs-1 d-flex">
                <Link to={"/login"} className="mx-auto mt-2">click here to login</Link>
            </div>)}
            {profile && <div className="d-flex">
                <span className="myTitleColor fs-1">Your profile</span>
                <button
                    onClick={() => {
                        dispatch(logoutThunk());
                        navigate("/login");
                    }}
                    className="btn btn-danger ms-auto my-3"
                >
                    Logout
                </button>
                <button onClick={save} className="btn btn-primary ms-2 my-3">
                    Save
                </button>
            </div>}
            {profile && (
                <div>
                    <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="firstName"
                            name="firstName"
                            value={profile.firstName}
                            onChange={(event) => {
                                const newProfile = {
                                    ...profile,
                                    firstName: event.target.value,
                                };
                                setProfile(newProfile);
                            }}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="lastName"
                            name="lastName"
                            value={profile.lastName}
                            onChange={(event) => {
                                const newProfile = {
                                    ...profile,
                                    lastName: event.target.value,
                                };
                                setProfile(newProfile);
                            }}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={profile.email}
                            onChange={(event) => {
                                const newProfile = {
                                    ...profile,
                                    email: event.target.value,
                                };
                                setProfile(newProfile);
                            }}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="dob">Date of Birth</label>
                        <input
                            type="date"
                            className="form-control"
                            id="dob"
                            name="dob"
                            value={profile.dob}
                            onChange={(event) => {
                                const newProfile = {
                                    ...profile,
                                    dob: event.target.value,
                                };
                                setProfile(newProfile);
                            }}
                        />
                    </div>
                </div>
            )}

            {profile && reviews && <div className="mt-3">
                <Card>
                    <Card.Header>{reviews.length} reviews</Card.Header>
                    <ListGroup variant="flush">
                        {reviews.length !== 0 && reviews.map((review) => (
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
                        {reviews.length === 0 &&
                            <ListGroup.Item key="1121">
                                You don't have any review. Find movies you like to post one!
                            </ListGroup.Item>
                        }
                    </ListGroup>
                </Card>
            </div>}
            {currentUser && currentUser.bookmarks && <div className="mt-3">
                {currentUser.bookmarks.length !== 0 && <MovieCard movieList={currentUser.bookmarks}
                            headerString={currentUser.bookmarks.length + ' Bookmarks'}/>}
                {currentUser.bookmarks.length === 0 && <div>
                    <Card className="">
                        <Card.Header>From your bookmarks</Card.Header>
                        <ListGroup variant="flush">
                            <ListGroup.Item>You don't have any bookmark, search and add you favorite movies！
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </div>}
            </div>}
            {currentUser && currentUser.following && <div className="mt-3">
                {/*<h2>FollowIng</h2>*/}
                <Card>
                    <Card.Header>{currentUser.following.length} Following</Card.Header>
                    <ListGroup variant="flush">
                        {currentUser.following.length !== 0 && currentUser.following.map((usr) => (
                            <ListGroup.Item key={usr.user}>
                                <Link to={`/profile/${usr.user}`}>{usr.username}</Link>
                            </ListGroup.Item>
                        ))}
                        {currentUser.following.length === 0 &&
                            <ListGroup.Item key="1231">
                                You are not following anyone, find people you might like to follow?
                            </ListGroup.Item>
                        }
                    </ListGroup>
                </Card>
            </div>}
            {currentUser && currentUser.followers && <div className="mt-3">
                {/*<h2>Followers</h2>*/}
                <Card>
                    <Card.Header>{currentUser.followers.length} Followers</Card.Header>
                    <ListGroup variant="flush">
                        {currentUser.followers.length !== 0 && currentUser.followers.map((follower) => (
                            <ListGroup.Item key={follower.user}>
                                <Link to={`/profile/${follower.user}`}>{follower.username}</Link>
                            </ListGroup.Item>
                        ))}
                        {currentUser.followers.length === 0 &&
                            <ListGroup.Item key="2311">
                                You don't have any follower :(
                            </ListGroup.Item>
                        }
                    </ListGroup>
                </Card>
            </div>}
        </div>
    );
}

export default ProfileScreen;
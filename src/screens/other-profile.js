import React, { useState, useEffect } from "react";
import {Link, useParams} from "react-router-dom";
import {findUserById, follow, unfollow} from "../services/user-service";
import {useDispatch, useSelector} from "react-redux";
import {updateUserThunk} from "../services/user-thunks";
import {deleteReview, findMyReviews} from "../services/review-service";
import {Card, ListGroup} from "react-bootstrap";
import MovieCard from "./movieCard";
function OtherProfile() {
    const { currentUser } = useSelector((state) => state.user);
    const { id } = useParams();
    const [user, setUser] = useState({});
    const [reviews, setReviews] = useState([]);
    const getMyReview = async () => {
        if (!id) {
            return
        }
        const response = await findMyReviews(id);
        setReviews(response);
    };

    useEffect(() => {
        const fetchUser = async () => {
            const response = await findUserById(id);
            setUser(response);
        };
        fetchUser();
        getMyReview();
    }, [id]);

    const dispatch = useDispatch();
    const handleBlock = async () => {
        try {
            user.blocked = !user.blocked;
            setUser(await dispatch(updateUserThunk(user)).unwrap());
            window.location.reload()
        } catch (e) {
            alert(e.message);
        }
    };

    const handleFollow = async () => {
        try {
            await follow(currentUser._id, id)
            window.location.reload()
        } catch (e) {
            alert(e.message);
        }
    };

    const handleUnfollow = async () => {
        try {
            await unfollow(currentUser._id, id)
            window.location.reload()
        } catch (e) {
            alert(e.message);
        }
    };

    const findIfFollowed = () => {
        if (!user.followers) {
            return
        }
        const res = user.followers.find((followingData) => followingData.user.toString() === currentUser._id.toString())
        return !!res;
    }

    return (
        <div>
            <div className="d-flex">
                <span className="myTitleColor fs-1">{user && user.username}'s Profile</span>
                {currentUser && user && (currentUser._id!==id) && (!findIfFollowed()) && <button onClick={handleFollow} className="btn btn-primary ms-auto my-3">follow</button>}
                {currentUser && user && (currentUser._id!==id) && (findIfFollowed()) && <button onClick={handleUnfollow} className="btn btn-primary ms-auto my-3">unfollow</button>}
                {currentUser && user && currentUser.role === 'admin' && <button onClick={handleBlock} className="btn btn-danger ms-2 my-3">{user.blocked && 'un'}block this user</button>}
            </div>

            {reviews && <div>
                <Card>
                    <Card.Header>{reviews.length} reviews</Card.Header>
                    <ListGroup variant="flush">
                        {reviews.length !== 0 && reviews.map((review) => (
                            <ListGroup.Item key={review._id}>
                                <Link to={`/details/${review.movieId}`} className="link-hover">
                                    {review.movieName}
                                </Link>
                                <div className="d-flex">
                                    {user && user.username} said: {review.text}
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
                                This user doesn't have any review
                            </ListGroup.Item>
                        }
                    </ListGroup>
                </Card>
            </div>}
            {user && user.bookmarks && <div className="mt-3">
                {user.bookmarks.length !== 0 &&
                    <MovieCard movieList={user.bookmarks} headerString={user.bookmarks.length + ' Bookmarks'}/>}
                {user.bookmarks.length === 0 && <div>
                    <Card className="">
                        <Card.Header>0 bookmarks</Card.Header>
                        <ListGroup variant="flush">
                            <ListGroup.Item>This user doesn't have any bookmark
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </div>}
            </div>}
            {user && user.following && <div className="mt-3">
                {/*<h2>FollowIng</h2>*/}
                <Card>
                    <Card.Header>{user.following.length} Following</Card.Header>
                    <ListGroup variant="flush">
                        {user.following.length !== 0 && user.following.map((usr) => (
                            <ListGroup.Item key={usr.user}>
                                <Link to={`/profile/${usr.user}`}>{usr.username}</Link>
                            </ListGroup.Item>
                        ))}
                        {user.following.length === 0 &&
                            <ListGroup.Item key="1231">
                                This user is not following anyone
                            </ListGroup.Item>
                        }
                    </ListGroup>
                </Card>
            </div>}
            {user && user.followers && <div className="mt-3">
                {/*<h2>Followers</h2>*/}
                <Card>
                    <Card.Header>{user.followers.length} Followers</Card.Header>
                    <ListGroup variant="flush">
                        {user.followers.length !== 0 && user.followers.map((follower) => (
                            <ListGroup.Item key={follower.user}>
                                <Link to={`/profile/${follower.user}`}>{follower.username}</Link>
                            </ListGroup.Item>
                        ))}
                        {user.followers.length === 0 &&
                            <ListGroup.Item key="2311">
                                This user doesn't have any follower
                            </ListGroup.Item>
                        }
                    </ListGroup>
                </Card>
            </div>}
        </div>
    );
}

export default OtherProfile;
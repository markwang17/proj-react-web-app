import axios from "axios";
// const REVIEWS_API = "http://localhost:4000/api/reviews";
const API_BASE = process.env.REACT_APP_API_BASE;
const REVIEWS_API = `${API_BASE}/reviews`;

const api = axios.create({
    withCredentials: true,
});

export const createReview = async (review) => {
    const response = await api.post(REVIEWS_API, review);
    return response.data;
};

export const findMyReviews = async (userId) => {
    const response = await api.get(`${REVIEWS_API}/user/${userId}`);
    return response.data;
};

export const findReviewForMovie = async (movieId) => {
    const response = await api.get(`${REVIEWS_API}/movie/${movieId}`);
    return response.data;
};

export const deleteReview = async (reviewId) => {
    const response = await api.delete(`${REVIEWS_API}/${reviewId}`);
    return response.data;
};

export const findAllReviews = async () => {
    const response = await api.get(`${REVIEWS_API}`);
    return response.data;
};
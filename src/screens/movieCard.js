import React from "react";
import { Card, ListGroup, Row, Col, Carousel } from "react-bootstrap";
import {useNavigate} from "react-router-dom";

const MovieCard = ({ movieList, headerString }) => {
    const navigate = useNavigate();
    const moviesPerPage = 4;
    const renderMovie = (movie) => (
        <Col key={movie.movieId} md={3} onClick={()=>{
            navigate(`/details/${movie.movieId}`)
        }} style={{ cursor: "pointer" }}>
            {/*<img src={`https://image.tmdb.org/t/p/w300${movie.movieCover}`} alt={movie.movieId}/>*/}
            {movie.movieCover && <img src={`https://image.tmdb.org/t/p/w300${movie.movieCover}`} alt={movie.movieId}/>}
            {!movie.movieCover && <img src={process.env.PUBLIC_URL + "/200x300.png"} alt="poster not found"/>}
        </Col>
    );

    const totalPages = Math.ceil(movieList.length / moviesPerPage);

    return (
        <Card>
            <Card.Header>{headerString}</Card.Header>
            <Carousel controls={totalPages > 1} interval={null}>
                {Array.from({ length: totalPages }).map((_, index) => (
                    <Carousel.Item key={index}>
                        <ListGroup variant="flush">
                            <Row>
                                {movieList
                                    .slice(index * moviesPerPage, index * moviesPerPage + moviesPerPage)
                                    .map((movie) => renderMovie(movie))}
                            </Row>
                        </ListGroup>
                    </Carousel.Item>
                ))}
            </Carousel>
            <style>
                {`
                .carousel-control-next,
.carousel-control-prev {
  width: 5vw;
  height: 20vw;
}`}
            </style>
        </Card>
    );
};

export default MovieCard;

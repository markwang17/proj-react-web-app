import React from "react";
import { Card, ListGroup, Row, Col, Carousel } from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons";

const MovieCard = ({ movieList, headerString }) => {
    const navigate = useNavigate();
    const moviesPerPage = 4;
    const renderMovie = (movie) => (
        <Col key={movie.id} xs={3} onClick={() => navigate(`/details/${movie.id}`)} style={{ cursor: "pointer" }}>
            {movie.poster_path && <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} className="p-2"/>}
            {!movie.poster_path && <img src={process.env.PUBLIC_URL + "/200x300.png"} alt="poster not found" className="p-2"/>}

            <div className="movie-info">
                <h5 className="movie-title">{movie.title}</h5>
                <div className="movie-rating">
                    <FontAwesomeIcon icon={faStar} className="star-icon" />
                    <span>{movie.vote_average}</span>
                </div>
            </div>

            <style>{`
        .movie-info {
          padding: 0.5rem;
          background-color: #fff;
        }

        .movie-title {
          font-size: 1rem;
          margin-bottom: 0.5rem;
        }

        .movie-rating {
          display: flex;
          align-items: center;
        }

        .star-icon {
          color: #ffc107;
          margin-right: 0.5rem;
        }
        
        @media (max-width: 576px) { /* xs screen size */
  .movie-title {
    font-size: 0.4rem;
  }
}

@media (min-width: 576px) and (max-width: 768px) { /* sm screen size */
  .movie-title {
    font-size: 0.6rem;
  }
}
      `}</style>
        </Col>
    );

    const totalPages = Math.ceil(movieList.length / moviesPerPage);

    return (
        <Card className="mt-3">
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
}`}
            </style>
        </Card>
    );
};

export default MovieCard;

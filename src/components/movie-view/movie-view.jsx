import React from 'react';
import Col from 'react-bootstrap/Col'
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import './movie-view.scss';

export const MovieView = ({ movies }) => {
  const {movieid} = useParams();

  const movie = movies.find((m) => m.id === movieid);

  return (
  <Col md={8}>
    <div>
      <div>
        <img src={movie.image} alt={movie.title} style={{width:'50%'}} />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.title}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.director.name}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.genre.name}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.description}</span>
      </div>
      <Link to={`/`}>
      <button className='back-button'>Back</button>
      </Link>
    </div>
    </Col>
  );
};

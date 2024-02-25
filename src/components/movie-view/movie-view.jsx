import React from 'react';
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

export const MovieView = ({ movie, onBackClick }) => {
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
      <Button onClick={onBackClick}>Back</Button>
    </div>
    </Col>
  );
};

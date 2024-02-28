import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const MovieCard = ({ movie, token, setUser, user }) => {

  const [isFavorite, setIsFavorite] = useState(
    false
  );

  useEffect(() => {
    if(user.favoriteMovies && user.favoriteMovies.includes(movie.id)) {
      setIsFavorite(true);
    }
  }, [user]);

  const addFavoriteMovie = () => {
    fetch(`https://movieapi-ba6f568c0d4b.herokuapp.com/users/${user.username}/movies/${movie.id}`,
    { method: 'POST', headers: {Authorization: `Bearer ${token}`}}
    )
      .then((response) => {
        if(response.ok){
          return response.json();
        } else {
          console.log('Failed to add favorite movie');
        }
      })
      .then((user) => {
        if (user) {
          alert('successfully added to favorites');
          localStorage.setItem('user', JSON.stringify(user));
          setUser(user);
          setIsFavorite(true);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  const removeFavoriteMovie = () => {
    fetch(`https://movieapi-ba6f568c0d4b.herokuapp.com/users/${user.username}/movies/${movie.id}`,
    {method: 'DELETE', headers:{Authorization: `Bearer ${token}`}}
    )

    .then((response) => {
      if(response.ok) {
        return response.json();
      } else {
        alert('Failed');
      }
    })
    .then((user) => {
      if(user) {
        alert('Successfully deleted from favories');
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
        setIsFavorite(false);
      }
    })
    .catch((error) => {
      alert(error);
    });
  };

  return (
    <Card className='h-100'>
      <Card.Img variant='top' src={movie.image} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.director.name}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
          <Button variant='link'>Open</Button>
        </Link>

        <Card.Body className='favorite-btns'>
          {!isFavorite ? (
            <Button className='fav-btn' onClick={addFavoriteMovie}>+</Button>
          ): (
            <Button className='fav-btn' onClick={removeFavoriteMovie}>-</Button>
          )}
          </Card.Body>  
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes ={
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    director: PropTypes.object.isRequired,
    description: PropTypes.string.isRequired
  }).isRequired,
};
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const MovieCard = ({ movie, token, setUser, user }) => {

  const [isFavorite, setIsFavorite] = useState(
    () => {
      return user.favoriteMovies && user.favoriteMovies.includes(movie.id);
    }
  );

  // useEffect(() => {
  //   setIsFavorite(user.favoriteMovies && user.favoriteMovies.includes(movie.id));
  // }, [user]);

  const addFavoriteMovie = () => {
    fetch(`https://movieapi-ba6f568c0d4b.herokuapp.com/users/${user._id}/addFavoriteMovie/${movie.id}`,
    { method: 'POST', headers: { Authorization: `Bearer ${token}` } }
    )
      .then((response) => {
        if(response.ok){
          return;
        } else {
          alert('Failed to add favorite movie');
          console.log('Failed to add favorite movie');
        }
      })
      .then(() => {
        if (user) {
          user.favoriteMovies.push(movie.id);
          localStorage.setItem('user', JSON.stringify(user));
          setUser(user);
          setIsFavorite(true);

          alert('successfully added to favorites');
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  const removeFavoriteMovie = () => {
    fetch(`https://movieapi-ba6f568c0d4b.herokuapp.com/users/${user._id}/removeFavoriteMovie/${movie.id}`,
    {method: 'POST', headers:{Authorization: `Bearer ${token}`}}
    )

    .then((response) => {
      if(response.ok) {
        return;
      } else {
        alert('Failed');
      }
    })
    .then(() => {
      if(user) {
        const updatedFavList = user.favoriteMovies.filter(
          (movieId) => movieId !== movie.id);
          user.favoriteMovies = updatedFavList;
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
        setIsFavorite(false);

        alert('Successfully deleted from favories');
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
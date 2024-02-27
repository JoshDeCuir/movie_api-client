import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card className='h-100'>
      <Card.Body>
      <Button onClick={() => onMovieClick(movie)} variant='link'>
        Open
      </Button>
    <Card.Title>{movie.title}</Card.Title>  
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
  onMovieClick: PropTypes.func.isRequired
};
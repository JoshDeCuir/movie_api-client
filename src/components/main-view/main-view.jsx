import { useState } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView} from '../movie-view/movie-view';

export const MainView = () => {
  const [movies, setBooks] = useState([
    {
      id: 1,
      title: " Drive",
      image:
        "https://m.media-amazon.com/images/I/51rfkCIZ5AL._SX300_SY300_QL70_FMwebp_.jpg",
      director: " Nicolas Winding Refn",
      genre: " Thriller",
      description: " A mysterious Hollywood action film stuntman gets in trouble with gangsters when he tries to help his neighbor's husband rob a pawn shop while serving as his getaway driver."
    },
    {
      id: 2,
      title: " The Other Guys",
      image:
        "https://m.media-amazon.com/images/I/51n64HmabHL._SX300_SY300_QL70_FMwebp_.jpg",
      director: " Adam McKay ",
      genre: " Comedy",
      description: " Two mismatched New York City detectives seize an opportunity to step up like the city's top cops, whom they idolize, only things don't quite go as planned."
    },
    {
      id: 3,
      title: " 13 Hours the Secret Soldiers of Benghazi",
      image:
        "https://m.media-amazon.com/images/I/517dwNbYc5L._SX300_SY300_QL70_FMwebp_.jpg",
      director: " Micheal Bay",
      genre: " Action",
      description: " During an attack on a U.S. compound in Libya, a security team struggles to make sense out of the chaos."
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
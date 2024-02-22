import { useEffect, useState } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView} from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  useEffect(() =>{
    if (!token) {
      return;
    }
    fetch('https://movieapi-ba6f568c0d4b.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
      const moviesFromApi = data.map((doc) => {
        return {
          id: doc._id,
          title: doc.title,
          image: doc.ImageURL,
          director: {
            name: doc.director.name,
            birthdate: doc.director.birthdate
          },
          genre: {
            name: doc.genre.name,
            description: doc.genre.description,
          },
          description: doc.description
        };
      });
      setMovies(moviesFromApi);
    });
  }, [token]);

  if (!user) {
    return (
    <> 
    <LoginView 
    onLoggedIn={(onLoggedInUser, loggedInToken) => {
      setUser(onLoggedInUser)
      setToken(loggedInToken);
    }} 
    />
    or
    <SignupView />
    </>
    );
  }

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
      <button onClick={handleLogout}>Logout</button>
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
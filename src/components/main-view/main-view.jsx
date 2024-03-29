import { useEffect, useState } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView} from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import { ProfileView } from '../profile-view/profile-view';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { NavigationBar } from '../../navigation-bar/navigation-bar';

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

  return (
    <BrowserRouter>
    <NavigationBar
      user={user}
      onLoggedOut={() => {
        setUser(null);
      }}
      />
    <Row className='justify-content-md-center'>
      <Routes>
        <Route
          path='/login'
          element={
            <>
              {user ? (
                <Navigate to='/' />
              ) : ( 
                <Col md={5}>
                  <LoginView onLoggedIn={(onLoggedInUser, loggedInToken) => {
                    setUser(onLoggedInUser);
                    setToken(loggedInToken);
                }} />
                </Col>
              )}
              </>
          }
        /> 
        <Route
          path='/signup'
          element={
            <>
              {user ? (
                <Navigate to= '/' />
              ) : (
                <Col md={5}>
                  <SignupView />
                </Col>
              )}
            </>
          }
        />
        <Route
          path='/profile'
          element={
            <>
            {!user ? (
              <Navigate to='/login' replace/>
            ) : (
              <Col md={5}>
                <Row>
                <ProfileView 
                  user={user}
                  token={token}
                  setUser={setUser}
                  movies={movies}
                  onDelete={() =>{
                    setUser(null);
                    setToken(null);
                    localStorage.clear();
                  }}
                  />
                </Row>
              </Col>
            )}
            </>
          }
        />
        <Route
        path='/movies/:movieid'
        element={
          <>
            {!user ? (
              <Navigate to='/login' replace />
            ) : movies.length === 0 ? (
              <Col>The list is empty!</Col>
            ) : (
              <Col md={8}>
                <MovieView 
                  movies={movies}  
                  />
              </Col>
              )}
            </>
          }
        />
        <Route
        path='/'
        element={
          <>
            {!user ? (
              <Navigate to='/login' replace />
            ) : movies.length === 0 ? (
              <Col>The list is empty!</Col>
            ) : (
              <>
              <Button onClick={handleLogout}>Logout</Button>
              {movies.map((movie) => (
                <Col className='mb-3' key={movie.id} md={5}>
                <MovieCard
                movie={movie}
                token={token}
                user={user}
                setUser={setUser}
                />
                </Col>
              ))}
            </>
          )}     
        </>
        }
      />
      </Routes>
    </Row>
  </BrowserRouter>
  );
  };

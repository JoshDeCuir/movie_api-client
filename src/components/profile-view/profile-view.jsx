import React, { useState } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

export const ProfileView = ({ user, token, movies, setUser }) => {

  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState(user.password);
  const [email,setEmail] = useState(user.email);
  const [birthday, setBirthday] = useState(user.birthday);

  const favMovie = user.favoriteMovies ? movies.filter((movie) => user.favoriteMovies.includes(movie.id)) : [];

  const handleUpdate = (event) => {
    event.preventDefault();
    
    const data = {
      username: username,
      password: password,
      email: email,
      birthday: birthday
    }
    
    fetch(`https://movieapi-ba6f568c0d4b.herokuapp.com/users/${user.username}` , {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }).then(async (response) => {
      console.log(response)
        if (response.ok) {
          var updatedUser = await response.json();
          alert('updated!');
          return updatedUser;
        } else {
          const e = await response.text()
          console.log(e)
          alert('Update failed')
        }
    }).then((updatedUser) => {
      if(updatedUser) {
        localStorage.setItem('user', JSON.stringify(updatedUser))
        setUser (updatedUser)
      }
    })

  }

  const handleDelete = () => {
    fetch(`https://movieapi-ba6f568c0d4b.herokuapp.com/users/${user._id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      if (response.ok) {
        setUser(null);
        alert('Your account has been deleted');
      } else {
        alert('Something went wrong')
      }
    })
  }

return (

  <Container>
    <Row className='justify-content-md-center mx-3 my-4'>
      <h2 className='profile-title'> Favorite movies</h2>
      {favMovie.map((movie) => {
        return (

          <Col
            key={movie.id}
            className='m-3'
          >
            <MovieCard
              movie={movie}
              token={token}
              setUser={setUser}
              user={user}
            />
          </Col>
        );
      })}
    </Row>

    <Row className='justify-content-center'>

    <Col md={6} >
        <h2 className="profile-title">Update info</h2>
        <Form className="my-profile" onSubmit={handleUpdate}>
        <Form.Group className="mb-2" controlId="formName">
        <Form.Label>Name:</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </Form.Group >
      <Form.Group className="mb-2" controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group className="mb-2" controlId="formEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control
         type="email"
         value={email}
         onChange={(e) => setEmail(e.target.value)}
         required
        />
      </Form.Group>
      <Form.Group controlId="formBirthday">
        <Form.Label>Birthday:</Form.Label>
        <Form.Control
         type="date"
         value={birthday}
         onChange={(e) => setBirthday(e.target.value)}
         required/>
      </Form.Group>

      <Button className='update' type='submit' onClick={handleUpdate}>Update</Button>
      <Button className='delete' onClick={handleDelete}>Delete Account</Button>

      </Form>
      </Col>
    </Row>
  </Container>

    )
  }

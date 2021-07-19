import React from 'react';
import { Link, Redirect} from 'react-router-dom';
import { LoginContext } from '../../context/authContext';
import { useState } from 'react';
import { useContext } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import {When} from 'react-if'


function SignUp(props){
  const contextType = useContext(LoginContext);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [interests, setInterests] = useState('');
  const [age, setAge] = useState('');
  const [user_bio, setUserBio] = useState('');
  const [location, setLocation] = useState('');
  const [education, setEducation] = useState('');

  const [email, setEmail] = useState('');

  const [role, setRole] = useState('user');

  const handleChange = (e) => {
    if (e.target.name === 'firstName') {
        setFirstName(e.target.value);
    }
     if (e.target.name === 'lastName') {
        setLastName(e.target.value);
    } else if (e.target.name === 'password') {
      setPassword(e.target.value);
    } else if (e.target.name === 'email') {
      setEmail(e.target.value);
    } else if (e.target.name === 'interests') {
        setInterests(e.target.value);
      } else if (e.target.name === 'age') {
        setAge(e.target.value);
      } else if (e.target.name === 'user_bio') {
        setUserBio(e.target.value);
      } else if (e.target.name === 'location') {
        setLocation(e.target.value);
      } else if (e.target.name === 'education') {
        setEducation(e.target.value);
      } else {
      setRole(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    contextType.signUp(firstName, lastName, email, password, role, interests, age, user_bio, location, education );
  };

    return(
    <>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicUsername">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              onChange={handleChange}
              name="firstName"
              type="text"
              placeholder="Enter your first name"
              required
            />
          </Form.Group>
          <Form.Group controlId="formBasicUsername">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              onChange={handleChange}
              name="lastName"
              type="text"
              placeholder="Enter your last name"
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              onChange={handleChange}
              name="email"
              type="email"
              placeholder="example@email.com"
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onChange={handleChange}
              name="password"
              type="password"
              placeholder="Password"
              required
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Interests</Form.Label>
            <Form.Control
              onChange={handleChange}
              name="interests"
              type="text"
              placeholder="interests"
              style={{wordSpacing: '15px', fontWeight: 'bold'}}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Age</Form.Label>
            <Form.Control
              onChange={handleChange}
              name="age"
              type="number"
              min='15'
              max='126'
              placeholder="Age"
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>User Bio</Form.Label>
            <Form.Control
              onChange={handleChange}
              name="user_bio"
              type="text"
              placeholder="Tell us a little about your self"
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Country</Form.Label>
            <Form.Control
              onChange={handleChange}
              name="location"
              type="text"
              placeholder="Country"
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Education</Form.Label>
            <Form.Control
              onChange={handleChange}
              name="education"
              type="text"
              placeholder="Education"
            />
          </Form.Group>
        <Button variant="info" type='submit'>
        {/* <Link to='/signin'> */}
            Sign Up
            {/* </Link> */}
        </Button>
        </Form>
        <When condition={contextType.isValid === false}>
                  <Alert variant='danger'>
                    Failed to Sign Up
                    </Alert>
                  </When>
                  <When condition={contextType.loggedIn === true} >
                  <Redirect to='/'/>
                  </When>
        </>

    )
}
export default SignUp;

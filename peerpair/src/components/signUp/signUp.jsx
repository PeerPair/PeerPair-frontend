import React from 'react';
import { Link } from 'react-router-dom';
import { LoginContext } from '../../context/authContext';
import { useState } from 'react';
import { useContext } from 'react';
import { Button, Form } from 'react-bootstrap';

function SignUp(props){

  const contextType = useContext(LoginContext);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
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
    } else {
      setRole(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    contextType.signUp(firstName, lastName, email, password, role);
  };

    return(
    <>
        <Form>
          <Form.Group controlId="formBasicUsername">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              onChange={handleChange}
              name="firstName"
              required
              type="text"
              placeholder="Enter your first name"
            />
          </Form.Group>
          <Form.Group controlId="formBasicUsername">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              onChange={handleChange}
              name="lastName"
              required
              type="text"
              placeholder="Enter your last name"
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              onChange={handleChange}
              name="email"
              required
              type="email"
              placeholder="example@email.com"
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onChange={handleChange}
              name="password"
              required
              type="password"
              placeholder="Password"
            />
          </Form.Group>
        <Button variant="info" onClick={handleSubmit}>
        <Link to='/signin'>Sign Up</Link>
        </Button>
        </Form>
        </>
    )
}
export default SignUp;




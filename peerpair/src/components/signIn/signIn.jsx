import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useState } from 'react';
import { useContext } from 'react';
import { LoginContext } from '../../context/authContext';
import { Button, Form, Alert } from 'react-bootstrap';
import {When} from 'react-if'

function SignIn(props){
 const contextType = useContext(LoginContext);
 const [username, setUsername]= useState({});
 const [password, setPassword]= useState({});

 const handleChange = e => {
    setUsername({...username,[e.target.name]: e.target.value})
    setPassword({...password,[e.target.name]: e.target.value})

  };

  const handleSubmit = e => {
    e.preventDefault();
    contextType.login(username.email, password.password);
  };

    return (
        <>
              <Form>
                  <Form.Group controlId="formBasicUsername">
                      <Form.Label>Email</Form.Label>
                      <Form.Control onChange={handleChange} name='email' type='email' placeholder='Enter your Email'>
                      </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onChange={handleChange} name='password' type="password" placeholder="Password" />
          </Form.Group>
              </Form>
         
              <Button 
              variant='info' onClick={handleSubmit} 
              type='submit' >
                  Sign In
                  </Button>
                  <When condition={contextType.isValid === false}>
                  <Alert variant='danger'>
                    Failed to LogIn 
                    </Alert>
                  </When>
                  <When condition={contextType.loggedIn} >
                  <Redirect to='/'/>
                  </When>
        
      </>
    );
}


export default SignIn;


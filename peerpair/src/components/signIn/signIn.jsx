import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useContext } from 'react';
import { LoginContext } from '../../context/authContext';
import { Button, Form } from 'react-bootstrap';

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
         
              <Button variant='info' onClick={handleSubmit}><Link to='/'>Sign In</Link></Button>
        
      </>
    );
}


export default SignIn;


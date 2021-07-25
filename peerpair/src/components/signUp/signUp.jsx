import React from 'react';
import {  Redirect} from 'react-router-dom';
import { LoginContext } from '../../context/authContext';
import { useState } from 'react';
import { useContext } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import { If,Then,Else } from 'react-if';
import {When} from 'react-if';
import Avatar from 'react-avatar';


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

  const validExtensions=['jpg', 'jpeg', 'png'];
  const [email, setEmail] = useState('');
  const [baseImage,setBaseImage]=useState(null);
  const changeHandle = (e) => {
    let file = e.target.files[0];
    let extension = file.name.split('.').pop().toLowerCase()
    const handlereader = (reader) => {
      let binaryString = reader.target.result;
      let string = btoa(binaryString);
      setBaseImage(string);
    };
    if (file && validExtensions.includes(extension)) {
      console.log(file);
      const reader = new FileReader();
      console.log(reader);
      reader.onload = handlereader;
      reader.readAsBinaryString(file);
    }

  };
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
      }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    contextType.signUp(firstName, lastName, email, password, interests, age, user_bio, location, education,baseImage );
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
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Profile Picture</Form.Label>
            <Form.Control
              onChange={changeHandle}
              name="profile_image"
              type="file"
              accept=".jpg, .jpeg, .png"
              required

            />
            <If condition={baseImage}>
              <Then>
              <button type='button' onClick={()=>{setBaseImage(null);}}>X</button>

            <img alt='profileImage' style={{width:'30%'}} src={`data:image/jpg;base64,${baseImage}`} />
              </Then>
              <Else>
          <Avatar name={firstName + '' + lastName} maxInitials={2}/>
              </Else>
            </If>
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

import React,{useState} from 'react';
import { Button,Modal,Form} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { When } from 'react-if';
import cookie from 'react-cookies';
import {useDispatch} from 'react-redux';
import { Icon } from "@iconify/react";
import pen from "@iconify-icons/uil/pen";

const token = cookie.load('auth');



const UpdateUserInfo = (props) =>{
  console.log(props.Provider,'Info which need to update');

  const [profile,setUpdProfile] = useState({});
  const [redirect,setRedirect] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let dispatch = useDispatch();

  const changeHandle = e =>{
    setUpdProfile({...profile,[e.target.name]:e.target.value})
  }

  const updProfile = e =>{
    e.preventDefault();
    fetchUpdProfile(profile);
}

  // Fetch Request to update it
  const fetchUpdProfile = async (updPro) =>{
    console.log('click',updPro);
    let res = await fetch(`${process.env.REACT_APP_API_URL}/updateInfo/${props.Provider.usertData._id}`,{
      method: 'PUT',
      body: JSON.stringify(updPro),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      }
    })

        let result = await res.json();
        console.log(result, 'update profile result');
        dispatch({type: 'get',
        payload:{...props.Provider, usertData : result.userID},
      })
      }

  return (
      <>
        {/* <When condition={redirect}><Redirect to={redirect}></Redirect></When> */}
        <Icon onClick={handleShow} icon={pen}  /> 

              {/* <Button variant='primary' onClick={handleShow}>edit</Button> */}
              <Modal
                show={show}
                onHide={handleClose}
                backdrop='static'
              >
              <Modal.Header closeButton>
               <Modal.Title>Update Your Profile</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <Form>
                  <Form.Group>
                      <Form.Label>First Name</Form.Label>
                      <Form.Control name='first_name' type='text' defaultValue={props.Provider.first_name} onChange={changeHandle}></Form.Control>
                  </Form.Group>
                  <Form.Group>
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control name='last_name' type='text' defaultValue={props.Provider.last_name} onChange={changeHandle}></Form.Control>
                  </Form.Group>
                  <Form.Group>
                      <Form.Label>Age</Form.Label>
                      <Form.Control name='age' type='number' defaultValue={props.Provider.age} onChange={changeHandle}></Form.Control>
                  </Form.Group>
                  <Form.Group>
                      <Form.Label>Location</Form.Label>
                      <Form.Control name='location' type='text' defaultValue={props.Provider.location} onChange={changeHandle}></Form.Control>
                  </Form.Group>
                  <Form.Group>
                      <Form.Label>Education</Form.Label>
                      <Form.Control name='education' type='text' defaultValue={props.Provider.education} onChange={changeHandle}/>
                  </Form.Group>
                  <Form.Group>
                      <Form.Label>User Bio</Form.Label>
                      <Form.Control name='user_bio' type='text' defaultValue={props.Provider.user_bio} onChange={changeHandle}/>
                  </Form.Group>
                  <Form.Group>
                      <Form.Label>Interests</Form.Label>
                      <Form.Control name='interests' type='text' defaultValue={props.Provider.interests} onChange={changeHandle}/>
                  </Form.Group>
              </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant='primary' onClick={updProfile}><Button onClick={handleClose}>Update</Button></Button>
              </Modal.Footer>
              </Modal>
      </>
  )
}

export default UpdateUserInfo;
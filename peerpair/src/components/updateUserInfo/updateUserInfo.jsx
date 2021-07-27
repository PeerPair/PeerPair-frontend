import React,{useState} from 'react';
// import { Button,Modal,Form} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { When } from 'react-if';
import cookie from 'react-cookies';
import {useDispatch} from 'react-redux';
import { Icon } from "@iconify/react";
import pen from "@iconify-icons/uil/pen";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';


const token = cookie.load('auth');

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  paper: {
    margin: theme.spacing(4, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  textField: {

    [`& fieldset`]: {
      borderRadius: 30,
    },
    [`&.Mui-focused `]: {
      padding : 30,
    },
    "&.Mui-activated fieldset": {
      padding : 30,
    },
  }
}));



const UpdateUserInfo = (props) =>{
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  console.log(props.Provider,'Info which need to update');

  const [profile,setUpdProfile] = useState({});
  // const [redirect,setRedirect] = useState(null);
  // const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
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
        <Icon onClick={handleClickOpen} icon={pen}  /> 

              {/* <Button variant='primary' onClick={handleShow}>edit</Button> */}
              {/* <Modal
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
              </Modal> */}
              <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit</DialogTitle>
        <DialogContent>
          <DialogContentText>
          Update Profile
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="First Name"
            fullWidth
            name='first_name' 
            type='text' 
            defaultValue={props.Provider.first_name} 
            onChange={changeHandle}
            variant="outlined"
            className={classes.textField}

          />
           <TextField
            margin="dense"
            id="name"
            label="Last Name"
            fullWidth
            name='first_name' 
            type='text' 
            defaultValue={props.Provider.last_name} 
            onChange={changeHandle}
            variant="outlined"
            className={classes.textField}
          />
          <TextField
            margin="dense"
            id="age"
            label="Age"
            fullWidth
            name='age' 
            type='number' 
            defaultValue={props.Provider.age} 
            onChange={changeHandle}
            variant="outlined"
            className={classes.textField}
          />
          <TextField
            margin="dense"
            id="location"
            label="Location"
            fullWidth
            name='location' 
            type='text' 
            defaultValue={props.Provider.location} 
            onChange={changeHandle}
            variant="outlined"
            className={classes.textField}
          />
          <TextField
            margin="dense"
            id="education"
            label="Education"
            fullWidth
            name='education' 
            type='text' 
            defaultValue={props.Provider.education} 
            onChange={changeHandle}
            variant="outlined"
            className={classes.textField}
          />
          <TextField
            margin="dense"
            id="user_bio"
            label="User Bio"
            fullWidth
            name='user_bio' 
            type='text' 
            defaultValue={props.Provider.user_bio} 
            onChange={changeHandle}
            variant="outlined"
            className={classes.textField}
          />
          <TextField
            margin="dense"
            id="interests"
            label="Interests"
            fullWidth
            name='interests' 
            type='text' 
            defaultValue={props.Provider.interests} 
            onChange={changeHandle}
            variant="outlined"
            className={classes.textField}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" className={classes.submit}
              fullWidth
              style={{backgroundColor: 'rgb(50, 218, 231)',fontWeight:"bold", width: '40%', height:'2.5em',
              boxShadow: '1px 2px 0px -1px rgba(0,0,0,0.30)'}}>
            Cancel
          </Button>
            <Button onClick={updProfile} className={classes.submit}
              fullWidth
              style={{backgroundColor: 'rgb(50, 218, 231)',fontWeight:"bold", width: '40%', height:'2.5em', marginRight:'3em',
              boxShadow: '1px 2px 0px -1px rgba(0,0,0,0.30)'}}
            >
          <Button onClick={handleClose} color="primary" style={{fontWeight:"bold", width: '100%',
             }}>
            Update
            </Button>
          </Button>
        </DialogActions>
      </Dialog>

      </>
  )
}

export default UpdateUserInfo;
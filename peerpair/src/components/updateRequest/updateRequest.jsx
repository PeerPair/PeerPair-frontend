import React,{useState} from 'react';
// import { Button,Modal,Form} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { When,If,Else,Then } from 'react-if';
import cookie from 'react-cookies';
import MenuItem from '@material-ui/core/MenuItem';
//////////////////////////////////
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
import { FormControl, InputLabel, Select } from '@material-ui/core';


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


const UpdateRequest = (props) =>{

  const [open, setOpen] = React.useState(false);
  const classes = useStyles();


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  console.log(props.Provider,'request that need to update');
  const category = ['Study Group', 'Gaming', 'Sports', 'Traveling', 'Cooking'];

  const [request,setUpdRequest] = useState({});
  const changeHandle = e =>{
    setUpdRequest({...request,[e.target.name]:e.target.value})
  }

  const updRequest = e =>{
    e.preventDefault();
    fetchUpdRequest(request);
}

// Fetch Request to update it
const fetchUpdRequest = async (updReq) =>{
  console.log('click',updReq);
  let res = await fetch(`${process.env.REACT_APP_API_URL}/request/${props.Provider._id}`,{
    method: 'PUT',
    body: JSON.stringify(updReq),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    }
  })

        let result = await res.json();
        console.log(result, 'update request result');
        // setRedirect(`${props.Provider._id}`);
        // setRedirect('/');
        // return result;
        props.updateData(result)
      }

        return (
            <>
            
              <MenuItem variant='primary' onClick={handleClickOpen}>  
              <p>
              Edit
              </p>
              <Icon icon={pen} >
            </Icon> </MenuItem>
              <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title"
              >
        <DialogTitle id="form-dialog-title">Update Request</DialogTitle>
        <DialogContent>
          <DialogContentText>
          Update Request
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="keyword"
            label="Keyword"
            fullWidth
            name='keyword' 
            type='text' 
            defaultValue={props.Provider.keyword} 
            onChange={changeHandle}
            variant="outlined"
            className={classes.textField}

          />
          <div className={classes.textField}>
            <FormControl variant="outlined" className={classes.formControl} 
            style={{width: '40%', margin:'1% 0'}}
            required
            >
        <InputLabel id="demo-simple-select-outlined-label"
        style={{padding:'1px'}}
        >Category</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          onChange={changeHandle}
          label="Category"
          name='category'
          aria-label="Default select example"
          required
          fullWidth
        >
          {category.map((val,idx)=>
          <MenuItem key={idx} value={val}>{val}</MenuItem>)}
        </Select>
      </FormControl>
            </div>
          <TextField
            margin="dense"
            id="description"
            label="Description"
            fullWidth
            name='description' 
            type='text' 
            defaultValue={props.Provider.description} 
            onChange={changeHandle}
            variant="outlined"
            className={classes.textField}
          />
          <TextField
            margin="dense"
            id="date"
            // label="Date"
            fullWidth
            name='created_date' 
            type='date' 
            defaultValue={props.Provider.location} 
            onChange={changeHandle}
            variant="outlined"
            value={new Date().toLocaleString()}
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
            <Button onClick={updRequest} className={classes.submit}
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




export default UpdateRequest;
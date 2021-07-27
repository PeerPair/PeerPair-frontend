import React from 'react';
import {Redirect } from 'react-router-dom';
import { useState } from 'react';
import { useContext } from 'react';
import { LoginContext } from '../../context/authContext';
import {Form, Alert } from 'react-bootstrap';
import {When} from 'react-if'

///////////////////////////////////
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import logo from  "../signUp/assets/logo2.png"
import people from "../signUp/assets/allimages5.png";
import shape from "../signUp/assets/shape.png";


import '../signUp/signUp.css';

const useStyles = makeStyles((theme) => ({

  root: {
    height: '100vh',
  },
  image: {
    background: '#d3baf5',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(30, 4),
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


function SignIn(props){
  const classes = useStyles();
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
        <style>{'body { background-color: #EDE3FA; hight: 100vh }'}</style>

<Grid container component="main" className={classes.root}>
<CssBaseline />
<img className="logo" alt="shape" src={logo} />
<img className="shape" alt="shape" src={shape} />
<img className="people" alt="shape" src={people} />
<Grid item xs={false} sm={4} md={7} className={classes.image} />


<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square className='signUpForm'>
<div className={classes.paper}>
  {/* <Avatar className={classes.avatar}>
    <LockOutlinedIcon />
  </Avatar> */}
  <Typography component="h1" variant="h5" 
  style={{fontFamily: '"Righteous", cursive'}}
  >
    Sign In

  </Typography>
  <form className={classes.form} 
  onSubmit={handleSubmit}>
    
    <TextField
    onChange={handleChange}
      variant="outlined"
      margin="normal"
      required
      fullWidth
      id="email"
      label="Example@email.com"
      name="email"
      type="email"
      autoComplete="email"
                  className={classes.textField}

    />
    <TextField
    onChange={handleChange}
      variant="outlined"
      margin="normal"
      required
      fullWidth
      name="password"
      label="Password"
      type="password"
      id="password"
      autoComplete="current-password"
                  className={classes.textField}

    />
        <FormControlLabel
      control={<Checkbox value="remember" color="primary" />}
      style={{fontWeight: 'bolder'}}
      label="Remember me"
    />

    <div style={{marginLeft: '35%', marginTop:'-2%'}}>
    <Button
      type="submit"
      variant="contained"
      color="primary"
      className={classes.submit}
      fullWidth
      style={{backgroundColor: 'rgb(50, 218, 231)',fontWeight:"bold", width: '50%',
      boxShadow: '1px 2px 0px -1px rgba(0,0,0,0.30)',
    }}
    >
      Sign In
    </Button>
    </div>
    <Grid container>
      <Grid item>
        <Link href="/signUp" variant="body2" style={{textDecoration:'none', color:'rgb(50, 218, 231)'}}>
          {"Don't have an account? You Can Sign Up Now "}
        </Link>
      </Grid>
    </Grid>
    <Box mt={5}>
    </Box>
  </form>
</div>
</Grid>
</Grid>
              {/* <Form>
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
                  </Button> */}
                  <When condition={contextType.isValid === false}>
                  <Alert variant='danger'>
                    Failed to LogIn 
                    </Alert>
                  </When>
                  <When condition={contextType.loggedIn === true} >
                  <Redirect to='/'/>
                  </When>
        
      </>
    );
}


export default SignIn;


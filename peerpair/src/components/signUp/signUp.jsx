import React from 'react';
import {  Redirect} from 'react-router-dom';
import { LoginContext } from '../../context/authContext';
import { useState } from 'react';
import { useContext } from 'react';
import {Form, Alert } from 'react-bootstrap';
import { If,Then,Else } from 'react-if';
import {When} from 'react-if';
import Avatar from 'react-avatar';
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
import logo from  "./assets/logo2.png"
import people from "./assets/allimages5.png";
import shape from "./assets/shape.png";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { FormControl, Input } from '@material-ui/core';



import './signUp.css';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    background: '#d3baf5',
    // backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(4, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  // avatar: {
  //   margin: theme.spacing(1),
  //   backgroundColor: theme.palette.secondary.main,
  // },
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


function SignUp(props){
  const classes = useStyles();
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
    <style>{'body { background-color: #EDE3FA; hight: 100vh }'}</style>

        <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <img className="logoy" alt="shape" src={logo} />
      <img className="shapey" alt="shape" src={shape} />
      <img className="peopley" alt="shape" src={people} />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />


      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square className='signUpForm'>
        <div className={classes.paper}>
          {/* <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar> */}
          <Typography component="h1" variant="h5" 
          style={{fontFamily: '"Righteous", cursive'}}
          >
            Sign Up

          </Typography>
          <form className={classes.form} 
          onSubmit={handleSubmit}>
            <div className='nameDiv'>
            <TextField
            onChange={handleChange}
            name="firstName"
            type="text"
            placeholder="Enter your first name"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="First Name"
            autoFocus
            className={classes.textField}
            />
            <TextField
            onChange={handleChange}
            name="lastName"
            type="text"
            placeholder="Enter your Last name"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="lastName"
            label="Last Name"
            style={{marginLeft:'3%'}}
            className={classes.textField}
            />
            </div>
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
            <TextField
            onChange={handleChange}
              variant="outlined"
              margin="normal"
              fullWidth
              name="interests"
              type="text"
              label="interests Traveling Sports"
              id="interests"
              style={{wordSpacing: '10px', fontWeight: 'bolder'}}
              className={classes.textField}

            />
            <div className='nameDiv'>
            <TextField
            onChange={handleChange}
              variant="outlined"
              margin="normal"
              fullWidth
              name="age"
              type="number"
              min='15'
              max='100'
              label="Age"
              id="age"
              className={classes.textField}

            />
            <TextField
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            fullWidth
            name="location"
            type="text"
            label="Country"
            id="Location"
            style={{marginLeft:'3%'}}
            className={classes.textField}

            />
            <TextField
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            fullWidth
            name="education"
            type="text"
            label="Education"
            id="education"
            style={{marginLeft:'3%'}}
            className={classes.textField}

            />
            </div>
            <TextField
            onChange={handleChange}
              variant="outlined"
              margin="normal"
              fullWidth
              name="user_bio"
              type="text"
              min='15'
              max='126'
              label="Tell us a little about your self"
              id="user_bio"
              className={classes.textField}

            />
             <Button
  variant="contained"
  component="label"
>
{/* <TextField */}
<FormControl
            onChange={changeHandle}
              variant="outlined"
              fullWidth
              // margin="normal"
              // name="profile_image"
              // type="file"
              // accept=".jpg, .jpeg, .png"
              // label="Profile Picture"
              // id="Profile Picture"
              style={{marginRight : '10%'}}
              className={classes.textField}
              id="formControl"
>
<label htmlFor="img">Profile Picture</label>
<input  margin="normal"
              name="profile_image"
              type="file"
              accept=".jpg, .jpeg, .png"
              label="Profile Picture"
              id="Profile Picture" />

            {/* /> */}
  {/* Upload Profile Picture */}
            <If condition={baseImage}>
              <Then>
              <IconButton aria-label="delete" type='button' onClick={()=>{setBaseImage(null);}}>
        <DeleteIcon />
      </IconButton>
            <img alt='profileImage' style={{width:'150px', height:'120px'}} src={`data:image/jpg;base64,${baseImage}`}/>
              </Then>
              <Else>
          <Avatar name={firstName + ' ' + lastName} maxInitials={2}
          style={{marginLeft : '10%'}}
          />
              </Else>
            </If>
          </FormControl>
</Button>
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
              Sign Up
            </Button>
            </div>
            <Grid container>
              <Grid item>
                <Link href="/signin" variant="body2" style={{textDecoration:'none', color:'rgb(50, 218, 231)'}}>
            
                  {"Already have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
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

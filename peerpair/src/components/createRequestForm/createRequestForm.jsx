import React,{useState} from 'react';
import { Redirect } from 'react-router-dom';
import './createRequestForm.scss'
import { When } from 'react-if';
import { If,Then,Else } from 'react-if';
import cookie from 'react-cookies'
import {Alert,Spinner} from 'react-bootstrap';
///////////////////////////////////////
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { FormControl, InputLabel, MenuItem } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import TopBanner from "./topBanner";
import Navbar from '../navbar/navbar';
import form2 from '../../assets/form2.jpg'




// import './signUp.css';
const validExtensions=['jpg', 'jpeg', 'png'];

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



const RequestForm = (props) =>{
  const classes = useStyles();
    const category = ['Study Group', 'Gaming', 'Sports', 'Traveling', 'Cooking'] 
    const [request,setReq] = useState({});
    const [okay,setStatus] = useState(true);
    const [redirect,setRedirect] = useState(null);
    const [loading,setloading] = useState(false);
    const [baseImage,setBaseImage]=useState(null);
    const changeHandleFile = (e) => {
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
    const createNewRequest = e =>{
        e.preventDefault();
        console.log(request)
        createRequest({...request,image:baseImage});
    }
    async function  createRequest(requestInfo){
        setloading(true);
        let token = cookie.load('auth');
        console.log(token);
        let data = await fetch(process.env.REACT_APP_API_URL+'/request',{ 
            method: 'post', 
            headers: new Headers({
              'Authorization': 'bearer '+token,
              'Content-Type': 'application/json'
            }),
            body: JSON.stringify(requestInfo) 
            })
            setloading(false);
            if(!data.ok) setStatus(false)
            else setRedirect('/')
        }



    const changeHandle = e =>{

        setReq({...request,[e.target.name]:e.target.value})
    }
    return (
        <>
<Navbar/>
<TopBanner/>
        <When condition={redirect}><Redirect to={redirect}></Redirect></When>
              <When condition={loading}><Spinner animation="border" role="status"></Spinner></When>
              <When condition={!okay}>  <Alert  variant='danger'>
    something went wrong
  </Alert></When>
    <style>{'body { background-color: #EDE3FA; hight: 100vh }'}</style>
        <Grid container component="main" className={classes.root}>
      <CssBaseline />
      {/* <Grid item xs={false} sm={4} md={3} className={classes.image} 
      /> */}


      <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square className='signUpForm' 
      style={{height: '65vh', marginTop:'1%', marginLeft: '25%', borderRadius:'1%'}}
      >
        <div className={classes.paper}>
          <Typography component="h1" variant="h5" 
          style={{fontFamily: '"Righteous", cursive', color: 'rgb(50, 218, 231)'}}
          >
Create A Request
          </Typography>
          <form className={classes.form} 
          onSubmit={createNewRequest}>
            <TextField
            style={{wordSpacing:'15px',fontWeight:'bold'}}  
            name='keyword' 
            onChange={changeHandle}
            type="text"
            placeholder="Enter the Keywords "
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="keyword"
            label="Keyword"
            autoFocus
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
            onChange={changeHandle}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="description"
              label="Description"
              type='description'               
              className={classes.textField}
              placeholder=' Add a Brief Description' 
              name="description" 
              cols="20" rows="10" 
            />

             <Button
  variant="contained"
  style={{backgroundColor: 'white'}}
  component="label"
>
<FormControl
              variant="outlined"
              fullWidth
              style={{marginRight : '10%',}}
              className={classes.textField}
              id="formControl"
              onChange={changeHandleFile}
>
<label htmlFor="img"
>Add An Image</label>
<input  margin="normal"
            style={{color:'white'}}
              name="profile_image"
              type="file"
              accept=".jpg, .jpeg, .png"
              label=""
              id="Profile Picture" />
            <If condition={baseImage}>
              <Then>
              <IconButton aria-label="delete" type='button' onClick={()=>{setBaseImage(null);}}>
        <DeleteIcon />
      </IconButton>
      <img alt='requestImage' style={{width:'20%'}} src={`data:image/jpg;base64,${baseImage}`} />

              </Then>
              <Else>
            <img alt='profileImage' style={{width:'150px', height:'140px'}} src={form2}
            />
              </Else>
            </If>
          </FormControl>
</Button>


            <div style={{marginLeft: '35%', marginTop:'-2%'}}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
              fullWidth
              style={{backgroundColor: 'rgb(50, 218, 231)',fontWeight:"bold", width: '50%',
              boxShadow: '1px 2px 0px -1px rgba(0,0,0,0.30)', marginTop: '3em'

            }}
            >
              Create Request
            </Button>
            </div>
          </form>
        </div>
      </Grid>
    </Grid>
        </>
    )
}

export default RequestForm;
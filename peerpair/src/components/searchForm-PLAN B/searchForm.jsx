import React from 'react';
import { useState } from "react";
import cookie from "react-cookies";
import {If, Else, Then } from "react-if";
import SearchResultRequest from '../searchResultRequest/searchResultRequest';
/////////////////////////
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, InputLabel, MenuItem } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import TopBanner from "./topBanner";
import Navbar from '../navbar/navbar';
import shape from "./shape.png";
import people from "./cropped.png";
import peopleY from "./cropped2.png";


const API = process.env.REACT_APP_API_URL;
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
  

const SearchForm = (props)=>{
    const classes = useStyles();
    const [keyword, setKeyword]= useState('');
    const [category, setCategory]= useState('');
    const [data, setData]= useState([]);
    const [render, setRender] = useState(false);
    const cat = ['Study Group', 'Gaming', 'Sports', 'Traveling', 'Cooking'] 
    let formData;
    const submitHandler = async(e)=>{
        e.preventDefault();
        formData = {keyword, category};
        console.log('THE BODY IS ===>', formData);
        await getSearchResults(formData);
        setRender(true);
    }
    async function getSearchResults(formData){
        try{
            const token = cookie.load('auth');
            const response = await fetch(`${API}/search`,{
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                  },
                body : JSON.stringify(formData)
              })

            //   console.log('THE Search REQUEST RESPONSE IS',await response.json())
              setData(await response.json())
            } catch(error){
                console.log('Failed To Get Search Request Data', error.message)
            }
            console.log('=============', data)
            return  data;
    }
    return( 
        <>
<Navbar/>
<TopBanner/>
        <If condition={render === false}>
            <Then>

        <>
{console.log('THE DATA THAT HAVE BEEN SET', data)}        
        
    <style>{'body { background-color: #EDE3FA;}'}</style>
        <Grid container component="main" className={classes.root}
        style={{height:'100vh'}}
        >
      <CssBaseline />
      <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square className='signUpForm' 
      style={{height: '45vh', marginTop:'5%', marginLeft: '10%', borderRadius:'1%'}}
      >
        <div className={classes.paper}>
          <Typography component="h1" variant="h5" 
          style={{fontFamily: '"Righteous", cursive', color: 'rgb(50, 218, 231)'}}
          >
Find Requests
          </Typography>
          <form className={classes.form} 
          onSubmit={submitHandler}>
            <TextField
            type="text"  
            name="keyword" 
            value={keyword} 
            onChange={(e)=> setKeyword(e.target.value)}
            style={{wordSpacing:'15px',fontWeight:'bold',}}  
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
            style={{width: '70%', margin:'1% 0'}}
            required
            >
        <InputLabel id="demo-simple-select-outlined-label"
        style={{padding:'1px'}}
        >Category</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          onChange={(e)=> setCategory(e.target.value)}          label="Category"
          name='category'
          aria-label="Default select example"
          required
          fullWidth
        >
          {cat.map((val,idx)=>
          <MenuItem key={idx} value={val}>{val}</MenuItem>)}
        </Select>
      </FormControl>
            </div>
            <div style={{marginLeft: '35%', marginTop:'-2%'}}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
              fullWidth
              style={{backgroundColor: 'rgb(50, 218, 231)',fontWeight:"bold", width: '50%',
              boxShadow: '1px 2px 0px -1px rgba(0,0,0,0.30)', marginTop: '5em'

            }}
            >
              Search
            </Button>
            </div>
          </form>
        </div>
      </Grid>
              <img className="peopley" alt="shape" src={people} 
              style={{width:'30%', 
              marginLeft:'60em', 
              
              marginTop:'5em'}}
              />
              {/* <img className="peopley" alt="shape" src={peopleY} 
              style={{width:'30%', marginLeft:'70em', marginTop:'-5em'}}
              /> */}

    </Grid>
        </> 
           </Then> 
            <Else> 
          <SearchResultRequest Provider={data}/>
       </Else>
        </If> 
        </>
    )
}

export default SearchForm;
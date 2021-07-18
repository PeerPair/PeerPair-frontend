import React from 'react';
import cookie from 'react-cookies';
import jwt from 'jsonwebtoken';
import superagent from 'superagent';
import { useState } from 'react';
import { useEffect } from 'react';

const API = 'https://peer-pair.herokuapp.com';
const SECRET = 'Mousa';


export const LoginContext = React.createContext();

function LoginProvider(props){

  const [loggedIn, setLoggedIn]= useState(false);
  const [user, setUser]= useState({});


  useEffect(()=>{
    const token = cookie.load('auth');
    validateToken(token);
},[]);

const login = async(email, password)=>{
    console.log(email,password);
    try{
    
        const response = await superagent.post(`${API}/signin`)
            .set('authorization', `Basic ${btoa(`${email}:${password}`)}`);
        
        validateToken(response.body.token);
    } catch(error){
        console.log('Failed to signIn', error.message)
    }
}
 const validateToken = token => {
    try {
      let user = jwt.verify(token, SECRET);
      console.log('all good');
      console.table(user)

      setLoginState(true, token, user);
    }
    catch (e) {
        console.log('Token Validation Error', e);
      setLoginState(false, null, {});
    }
  };
 const logout = () => {
    setLoginState(false, null, {});
  };
  const signUp = async(first_name, last_name, email, password)=>{
    console.log('RESPONSE===', first_name, last_name, email, password)
        try{
          console.log('hhhhhhh')
        
        const response = await superagent.post(`${API}/signup`, {first_name, last_name, email, password });
        validateToken(response.body.token);
        console.log('response.body.token', response.body.token)

        }catch(error){
            console.log('SignUp Error', error.message);
        }
  }

 const setLoginState = (loggedIn, token, user) => {
    cookie.save('auth', token);
    setUser(user);
    setLoggedIn(loggedIn);
  };
const state = {login, logout, signUp, loggedIn, user}
    return (
      <LoginContext.Provider value={state}>
        {props.children}
      </LoginContext.Provider>
    );
}

export default LoginProvider;


// "first_name": "ibarhim",
// "last_name": "Al-khateeb",
// "password": "1234567a",
// "email": "ibarhim@gmail.com",
// "interests": " traveling Sports Art",
//   "age" : "25",
//   "user_bio": "love learning new things",
//   "location": "amman",
//   "education": "Translator"
import React from 'react';
import cookie from 'react-cookies';
import jwt from 'jsonwebtoken';
import superagent from 'superagent';
import { useState } from 'react';
import { useEffect } from 'react';



export const LoginContext = React.createContext();


function LoginProvider(props){

  const [loggedIn, setLoggedIn]= useState(false);
  const [user, setUser]= useState({});
  const [isValid, setInvalid] = useState(true);


  useEffect(()=>{
    const token = cookie.load('auth');
    validateToken(token);
},[]);

const login = async(email, password)=>{
    console.log(email,password);
    try{
    
        const response = await superagent.post(`${process.env.REACT_APP_API_URL}/signin`)
            .set('authorization', `Basic ${btoa(`${email}:${password}`)}`);
        
        validateToken(response.body.token);
    } catch(error){
        setInvalid(false);
        console.log('Failed to signIn', error.message)
    }
}
 const validateToken = token => {
    try {
      let user = jwt.verify(token, process.env.REACT_APP_SECRET);
      console.log('all good');
      console.table(user)

      setLoginState(true, token, user, false);
    }
    catch (e) {
        console.log('Token Validation Error', e);
      setLoginState(false, null, {}, true);
    }
  };
 const logout = () => {
     console.log('loggedOut')
    setLoginState(false, null, {}, true);
  };
  const signUp = async(first_name, last_name, email, password)=>{
    console.log('RESPONSE===', first_name, last_name, email, password)
        try{
          console.log('hhhhhhh')
        
        const response = await superagent.post(`${process.env.REACT_APP_API_URL}/signup`, {first_name, last_name, email, password });
        validateToken(response.body.token);
        console.log('response.body.token', response.body.token)

        }catch(error){
            setInvalid(false);
            console.log('SignUp Error', error.message);
        }
  }

 const setLoginState = (loggedIn, token, user, isValid) => {
    cookie.save('auth', token);
    setUser(user);
    setLoggedIn(loggedIn);
    setInvalid(isValid)
  };
const state = {login, logout, signUp, loggedIn, user, isValid}
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
import React from 'react';
import { Link } from 'react-router-dom';


const SignIn = (props) =>{
    return (
        <>
          <h2>PeerPair</h2>
          <h4>Sign In</h4>
          <form>
              <label htmlFor="">Email</label>
              <input type="email" />
              <label htmlFor="">Password</label>
              <input type="password" />
              <button type="submit"><Link to='/'>Sign In</Link></button>
              <h6>Forgot Password?</h6>
          </form>
        </>
    )
}

export default SignIn;


import React from 'react';
import { Link } from 'react-router-dom';

const SignUp = (props) =>{
    return (
        <>
          <h2>PeerPair</h2>
          <h4>Sign UP</h4>
          <form>
              <label >First Name</label>
              <input type="text" />
              <label >Last Name</label>
              <input type="text" />
              <label >Email</label>
              <input type="email" />
              <label >Password</label>
              <input type="password" />
              <label >Interests</label>
              <input type="text" />
              <label >Age</label>
              <input type="number" />
              <label >Education</label>
              <input type="text" />
              <label >Location</label>
              <input type="text" />
              <button type="submit"><Link to='/signin'>Submit</Link></button>
          </form>
        </>
    )
}

export default SignUp;
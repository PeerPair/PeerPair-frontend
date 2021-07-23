import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { LoginContext } from '../../context/authContext';

const Navbar = (props) =>{
  const contextType = useContext(LoginContext);
    return (
        <>
          <nav>
            <button><Link to="/settings">settings</Link></button>
            <button><Link to="/notification">notification</Link></button>
            <button><Link to="/search">search</Link></button>
            <button><Link to="/explore">explore</Link></button>
            <button onClick={contextType.logout} type='button'>LogOut</button>
          </nav>
        </>
    )
}

export default Navbar ;

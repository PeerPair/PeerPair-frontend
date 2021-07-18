import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = (props) =>{
    return (
        <>
          <nav>
            <button><Link to="/settings">settings</Link></button>
            <button><Link to="/notification">notification</Link></button>
            <button><Link to="/search">search</Link></button>
            <button><Link to="/explore">explore</Link></button>
          </nav>
        </>
    )
}

export default Navbar ;

import React from 'react';
import { Link } from 'react-router-dom';



//for route '/'
const LandingPage = (props) =>{
    return (
        <>
            <button type="submit"><Link to='/signin'>Sign In</Link></button>
            <button type="submit"><Link to='/signup'>Sign Up</Link></button>
        </>
    )
}

export default LandingPage;
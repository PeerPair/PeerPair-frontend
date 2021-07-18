import React from 'react';
import { Link } from 'react-router-dom';

//all created requests by the user which rendered in his own profile
const YourRequests = (props) =>{
        return (
            <>
              <h4>Your Requests here</h4>
              <button><Link to='/request/id'>View Details</Link></button>
            </>
        )
}

export default YourRequests;
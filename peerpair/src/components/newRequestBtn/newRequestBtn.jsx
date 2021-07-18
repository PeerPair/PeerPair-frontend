import React from 'react';
import { Link } from 'react-router-dom';

const NewRequestBtn = (props) =>{
    return (
        <>
          <button><Link to="/request">New Request</Link></button>
        </>
    )
}

export default NewRequestBtn;
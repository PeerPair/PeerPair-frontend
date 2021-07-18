import React from 'react';
import { Link } from 'react-router-dom';


const RequestForm = (props) =>{
    return (
        <>
          <h2>PeerPair</h2>
          <h4>Create Request</h4>
          <form>
              <label htmlFor="">Keywords</label>
              <input type="text" />
              <label htmlFor="">Category</label>
              <option value=""></option>
              <option value=""></option>
              <option value=""></option>
              <label htmlFor="">Description</label>
              <textarea></textarea>
              <button type="submit"><Link to='/'>Create Request</Link></button>
          </form>
        </>
    )
}

export default RequestForm;
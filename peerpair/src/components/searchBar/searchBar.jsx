import React from 'react';
import { Link } from 'react-router-dom';

const Search = (props) =>{
        return (
            <>
              <h4>Search here</h4>
              <button type="submit"><Link to='/searchResult'>Search</Link></button>
            </>
        )
}

export default Search;
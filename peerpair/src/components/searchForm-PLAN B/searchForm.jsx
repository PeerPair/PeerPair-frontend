import React from 'react';
import { useState } from "react";
import cookie from "react-cookies";
import {If, Else, Then } from "react-if";
import SearchResultRequest from '../searchResultRequest/searchResultRequest';

const API = process.env.REACT_APP_API_URL;

const SearchForm = (props)=>{

    const [keyword, setKeyword]= useState('');
    const [category, setCategory]= useState('');
    const [data, setData]= useState([]);
    const [render, setRender] = useState(false);

    let formData;
    const submitHandler = async(e)=>{
        e.preventDefault();
        formData = {keyword, category};
        console.log('THE BODY IS ===>', formData);
        await getSearchResults(formData);
        setRender(true);
    }
    async function getSearchResults(formData){
        try{
            const token = cookie.load('auth');
            const response = await fetch(`${API}/search`,{
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                  },
                body : JSON.stringify(formData)
              })

            //   console.log('THE Search REQUEST RESPONSE IS',await response.json())
              setData(await response.json())
            } catch(error){
                console.log('Failed To Get Search Request Data', error.message)
            }
            console.log('=============', data)
            return  data;
    }
    return( 
        <If condition={render === false}>
            <Then>

        <>
{console.log('THE DATA THAT HAVE BEEN SET', data)}        
            <form 
            onSubmit={submitHandler}
            >
                <label>Keyword
                <input type="text"  name="keyword" value={keyword} 
                onChange={(e)=> setKeyword(e.target.value)}/>
                </label>
                <select value={category} onChange={(e)=> setCategory(e.target.value)}>
                    <option value="" default>Choose a Category</option>
                    <option value="Study Group">Study Group</option>
                    <option value="Gaming">Gaming</option>
                    <option value="Sports">Sports</option>
                    <option value="Traveling">Traveling</option>
                    <option value="Cooking">Cooking</option>
                </select>
                <button type='submit'>Submit</button>
            </form>
        </> 
           </Then> 
            <Else> 
          <SearchResultRequest Provider={data}/>
       </Else>
        </If> 
    )
}

export default SearchForm;
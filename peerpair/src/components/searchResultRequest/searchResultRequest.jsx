import React from 'react';
import { useState, useEffect } from "react";
import cookie from "react-cookies";
import { When, If, Else, Then } from "react-if";
import superagent from 'superagent';
import { useContext } from 'react';
import { LoginContext } from '../../context/authContext';
import { getUserInfo } from '../../store/userInfo/action.js';
import { connect } from 'react-redux';
import {getOthersProfile} from '../../store/othersProfile/reducer';

const API = process.env.REACT_APP_API_URL;

let idArray = [];
let ownersArray = [];
const SearchResultRequest = (props) =>{

  const [owner, setOwner] = useState([]);

  let results = props.Provider;
  for(let i = 0; i < results.length; i++){
    idArray.push(results[i].user_ID)
  }
  console.log('THE ID ARRAY IS', idArray)

  // useEffect(()=>{
  //     for(let i = 0; i< idArray.length ; i++){
  //       ownersArray.push(props.getOthersProfile(idArray[i]));
  //       //  ownersArray.push(owner)
  //   }
  // }, []);
  useEffect(()=>{
    getReqOwner(props.Provider[0].user_ID);
  }, []);
  console.log('REQUEST OWNER ID', props.Provider)
  

  const user = props.info.userInfo.usertData;
  console.log('THE OWNER DATA===>', owner);

  async function getReqOwner(id){
    try{
        const token = cookie.load('auth');
        // setOwner({loading: true})
        const response = await superagent.get(`${API}/profile/${id}`).set({'Authorization' : 'Bearer '+ token});
        console.log('THE Request Owner IS------' , response.body);
        // setOwner({loading: false})
        return await setOwner(response.body)
    } catch(error){
                console.log('Failed To Get The Request User Data', error.message)
            }
  }
  console.log('THE OWNERS ARRAY', ownersArray)
  console.log('Owner ----> ', owner)
  
        return (
            <>
            {results.map((element,i) => 
              <ul key={i}>
              {/* <h4>{ownersArray[i].first_name} {ownersArray[i].last_name}</h4> */}
              <h4>{owner.first_name} {owner.last_name}</h4>
              <h6>{element.keyword}</h6>
              <h6>{element.category}</h6>
              <h6>{element.description}</h6>
              <h6>{element.created_date}</h6>
              </ul >
            )}
            </>
        )
}
const mapStateToProps = state => ({
  info: state.userInfo,
  results : state.othersProfile,
})
const mapDispatchToProps = { getUserInfo, getOthersProfile };

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultRequest);

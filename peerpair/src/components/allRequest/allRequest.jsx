import React from 'react';
import { useEffect,useState } from "react";
import cookie from 'react-cookies';
import{Card,Button } from 'react-bootstrap';
import { Link  } from 'react-router-dom';
import superagent from'superagent';
import OthersReqCard from '../resultCard/card';
const token = cookie.load('auth');



const AllRequest = (props) =>{
  const [allRequest, setAllRequest] = useState({data:[],userInfoData:[]})
 
    useEffect(() => {
      const getAllRequest = async () => {
        const allRequestFromAPI = await fetchAllRequest();
        setAllRequest(allRequestFromAPI);
    }
    getAllRequest()
  }, [])

   // Fetch allRequest
   const fetchAllRequest = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/allRequest`,{
      method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        }
    })
    console.log(res,'res');
    const data = await res.json()
    console.log(data, 'get all request');
    let userInfoData = [];
    for (let i = 0; i < data.length; i++) {
      const userData = await superagent.get(`${process.env.REACT_APP_API_URL}/profile/${data[i].user_ID}`).set({'Authorization' : 'Bearer '+ token});
      userInfoData.push(userData.body);
      
    }
    return {data,userInfoData};
  }

        return (
          <>
          {allRequest.userInfoData.map((val,idx)=><OthersReqCard key={idx} requestData={allRequest.data[idx]} owner={val}/>)}
        </>)
      }



export default AllRequest;
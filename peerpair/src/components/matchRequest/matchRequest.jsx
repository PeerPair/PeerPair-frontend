import React from 'react';
import { useEffect,useState } from "react";
import cookie from 'react-cookies';
import{Card , Button} from 'react-bootstrap';
import { Link  } from 'react-router-dom';
import OthersReqCard from '../resultCard/card';
import  superagent  from 'superagent';
const token = cookie.load('auth');


const MatchRequest = (props) =>{
  const [matchRequest, setRequest] = useState({data:[],userInfoData:[]})

    useEffect(() => {
      const getMatchRequest = async () => {
        const MatchRequestFromAPI = await fetchMatchRequest();
        setRequest(MatchRequestFromAPI);
        console.log('MatchRequestFromAPI',MatchRequestFromAPI)
        console.log('matchRequest',matchRequest)
    }
    getMatchRequest()
  }, [])

   // Fetch MatchRequest
   const fetchMatchRequest = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/explore`,{
      method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        }
    })
    console.log(res,'res');
    const data = await res.json()
    console.log(data, 'get match request');
    let userInfoData = [];
    for (let i = 0; i < data.length; i++) {
      const userData = await superagent.get(`${process.env.REACT_APP_API_URL}/profile/${data[i].user_ID}`).set({'Authorization' : 'Bearer '+ token});
      userInfoData.push(userData.body);
      
    }
    return {data,userInfoData};
    
  }

  if(matchRequest){
        return (
            <>
            {matchRequest.userInfoData.map((val,idx)=><OthersReqCard key={idx} requestData={matchRequest.data[idx]} owner={val}/>)}
            </>
            
        )
      }
    else return (
      <h2>is loading</h2>
    )
}

export default MatchRequest;
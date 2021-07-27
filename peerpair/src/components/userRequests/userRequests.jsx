import React from 'react';
import { Link  } from 'react-router-dom';
import{Card,Button } from 'react-bootstrap';
import { useEffect,useState } from "react";
import { If,Then,Else } from 'react-if';
import cookie from 'react-cookies';
import ReqBanner from '../reqBanner/reqBanner';
import RequestCard from '../reqCard/reqCard';
import { Spinner } from 'react-bootstrap';
const token = cookie.load('auth');


//all created requests by the user which rendered in his own profile
const YourRequests = (props) =>{
  const [requests, setRequests] = useState([])
  const [done, setDone] = useState(false)
  const useForceUpdate = () => useState()[1];
  const force = useForceUpdate();

    useEffect(() => {
      const getRequests = async () => {
        const requestsFromAPI = await fetchRequests();
        setRequests(requestsFromAPI);
        setDone(true);
        force();
        
    }
    getRequests()
  }, [])
  
  const fetchRequests = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/request`,{
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        }
    })
    
    const data = await res.json()
    console.log(data, 'requests');
    return data ;
  }
  


  return (
      
      <ReqBanner>



      {requests.map((val,idx)=>{
        return (
          <RequestCard key={idx} data={val}/>
        )
      })}
      </ReqBanner>
      
  )
}
      



export default YourRequests;
import React from 'react';
import { useEffect,useState } from "react";
import cookie from 'react-cookies';
import { Button } from 'react-bootstrap';
const token = cookie.load('auth');
let dataResult=[];

const RequestSubmitters = (props) =>{
  console.log(props.Provider,'request');
  const [submitterInfo, setSubmitter] = useState([]);

    useEffect(() => {
      const getSubmitterInfo = async () => {
        const requestSubmitterFromAPI = await fetchSubmitter();
        setSubmitter(requestSubmitterFromAPI);
    }
    getSubmitterInfo()
  }, [])


  // Fetch Submitter Profile to render submitter info 
  let results;
  const fetchSubmitter = async () => {
    let data;
    // props.Provider.submitters.map((val,idx)=>{
      results = async () =>{
        for (let index = 0; index < props.Provider.submitters.length; index++) {
          const res = await fetch(`${process.env.REACT_APP_API_URL}/profile/${props.Provider.submitters[index]}`,{
              method: 'GET',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
              }
          })
          data = await res.json();
          console.log(data, 'get Submitter Info');
          return dataResult.push(data);
        }   
        }
        
    // })
    console.log(await results(),'results');
  }

  // Fetch Request Submitter to delete chosen submitter
  const fetchRequestSubmitter = async (e) =>{
    console.log('click');
    const res = await fetch(`${process.env.REACT_APP_API_URL}/cancelsubmit/${props.Provider._id}`,{
      method: 'PUT',
      body: JSON.stringify({id:e.target.value}),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      }
  })
          let data = await res.json();
          console.log(data, 'delete Submitter');
          return data;
  }


  // Fetch Accepted Request to accept or cancel accept submitter
  const fetchAcceptedRequest = async (e) =>{
    console.log('click');
    //for cancel accept submitter
    if (props.Provider.accepted){
    const res = await fetch(`${process.env.REACT_APP_API_URL}/cancelaccept/${props.Provider._id}`,{
       method: 'PUT',
       body: JSON.stringify({ accepted: false, current_partner: 'none' }),
       headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      }
     })
          let data = await res.json();
          console.log(data, 'Cancel Accept Submitter');
          return data;
    }
  //for accept submitter
    else {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/accept/${props.Provider._id}`,{
        method: 'PUT',
        body: JSON.stringify({ id: e.target.value }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        }
     })
          let data = await res.json();
          console.log(data, 'Accept Submitter');
          return data;
    }
}

  console.log(dataResult,'subInfo');
  if(props.Provider.submitters.length >= 1){
        return (
            <>
              <h4>Request Submitters here</h4>
              <ul>
              {dataResult.map((submitter,idx)=>{
                return(
                <li>
                <h4>{submitter.first_name} {submitter.last_name}</h4>
                <h6>{submitter.education}</h6>
                <Button onClick={fetchAcceptedRequest} value={props.Provider.submitters[idx]}>{(props.Provider.accepted)?'Cancel':'Accept'}</Button>
                <Button onClick={fetchRequestSubmitter} value={props.Provider.submitters[idx]}>Dismiss</Button> 
                </li>
                )
              })}
              </ul>
            </>
        )
      }
         else return (
        <h3>Oops Still No Submitter</h3>
      )
}

export default RequestSubmitters;
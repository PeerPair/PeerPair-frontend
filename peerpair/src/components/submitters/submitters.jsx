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
       const allDataInfo = await fetchSubmitter();
       setSubmitter(allDataInfo);
    }
    getSubmitterInfo()
  }, [ props.Provider])


  // Fetch Submitter Profile to render submitter info 
  let results;
  const fetchSubmitter = async () => {
        let allData=[];
         for (let index = 0; index < props.Provider.submitters.length; index++) {
          const res = await fetch(`${process.env.REACT_APP_API_URL}/profile/${props.Provider.submitters[index]}`,{
              method: 'GET',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
              }
          })
          const data = await res.json();
          console.log(data, 'get Submitter Info');
          allData.push(data);
        }   
        return allData;
        }
        
    // })

  

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
          props.updateData(data);
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
          props.updateData(data);

          return data;
    }
}

  console.log(submitterInfo,'subInfo');
        return (
            <>
              <h4>Request Submitters here</h4>
              <ul>
              {submitterInfo.map((submitter,idx)=>{
                return(
                <li>
                <h4>{submitter.first_name} {submitter.last_name}</h4>
                <h6>{submitter.education}</h6>
                <Button onClick={fetchAcceptedRequest} value={props.Provider.submitters[idx]}>{(props.Provider.accepted)?'Cancel':'Accept'}</Button>
                {(props.Provider.accepted)? <Button disabled>Dismiss</Button> :
                <Button onClick={fetchRequestSubmitter} value={props.Provider.submitters[idx]}> Dismiss</Button> }
                </li>
                )
              })}
              </ul>
            </>
        )
      }
        

export default RequestSubmitters;
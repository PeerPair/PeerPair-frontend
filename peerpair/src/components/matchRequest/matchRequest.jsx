import React from 'react';
import { useEffect,useState } from "react";
import cookie from 'react-cookies';
import{Card , Button} from 'react-bootstrap';
import { Link  } from 'react-router-dom';
import superagent from 'superagent';
const token = cookie.load('auth');
// import { useState, useEffect } from "react";

const API = process.env.REACT_APP_API_URL;
let idArr = [];
let ownersArr = [];
const MatchRequest = (props) =>{
  const [matchRequest, setRequest] = useState([])
  const [owners, setOwners] = useState([]);

  const iteration = async()=>{
    for(let i = 0; i < matchRequest.length; i++){
      idArr.push(matchRequest[i].user_ID)
    }
    for(let j = 0; j < idArr.length; j++){
       await getReqOwner(idArr[j])
    }
  }
  async function getReqOwner(id){
    try{
        const token = cookie.load('auth');
        const response = await superagent.get(`${API}/profile/${id}`).set({'Authorization' : 'Bearer '+ token});
        console.log('THE Request Owner IS------' , response.body);
        await ownersArr.push(response.body)
        return await setOwners([...owners, response.body])
    } catch(error){
                console.log('Failed To Get The Request User Data', error.message)
            }
  }
  console.log('THE ID ARRAY IS', idArr)
  useEffect(()=>{
    iteration();
  }, []);

    useEffect(() => {
      const getMatchRequest = async () => {
        const MatchRequestFromAPI = await fetchMatchRequest();
        await setRequest(MatchRequestFromAPI);
        idArr.push(MatchRequestFromAPI)
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
    return await data;
  }
console.log('matchRequest------------->', matchRequest)
  if(matchRequest){
        return (
            <>
              <h4>Match Request here</h4>
              {matchRequest.map((val,idx)=>
                <ul key={idx}>
                  {ownersArr.map((element, i)=>
                  <ul key={i}>
                    <h4>Name : {element.first_name} {element.last_name}</h4>
              <Card className="text-center">
              <Card.Header >{(val.accepted)?'Closed':'Open'}</Card.Header>
              <Card.Body>
              <Link to={`/profile/${val.user_ID}`} ><img src="http://via.placeholder.com/200x200" alt="placeHolder" /></Link>
                <Card.Title style={{wordSpacing:'10px'}}>{val.keyword.toUpperCase()}</Card.Title>
                <Card.Text>
                  {val.description}
                </Card.Text>
                <Link to={`/request/${val._id}`}><Button>View Details</Button></Link>
              </Card.Body>
              <Card.Footer className="text-muted">{val.created_date}</Card.Footer>
            </Card>)
                  </ul>
                  )}
                </ul>
          )}
            </>
        )
      }
    else return (
      <h2>is loading</h2>
    )
}

export default MatchRequest;
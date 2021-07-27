import React from 'react';
import { useEffect,useState } from "react";
import cookie from 'react-cookies';
import{Card,Button } from 'react-bootstrap';
import { Link  } from 'react-router-dom';
import superagent from 'superagent';
const token = cookie.load('auth');

const API = process.env.REACT_APP_API_URL;
let idArray = [];
let ownersArray = [];
const AllRequest = (props) =>{
  const [allRequest, setAllRequest] = useState([])
  const [owner, setOwner] = useState([]);
  
  useEffect(()=>{
    iteration();
  }, []);
  
  const iteration = async()=>{
    for(let i = 0; i < allRequest.length; i++){
       idArray.push(allRequest[i].user_ID)
    }
    for(let j = 0; j < idArray.length; j++){
      await getReqOwner(idArray[j])
    }
  }
  async function getReqOwner(id){
    try{
        const token = cookie.load('auth');
        const response = await superagent.get(`${API}/profile/${id}`).set({'Authorization' : 'Bearer '+ token});
        console.log('THE Request Owner IS------' , response.body);
        await ownersArray.push(response.body)
        return await setOwner([...owner, response.body])
    } catch(error){
                console.log('Failed To Get The Request User Data', error.message)
            }
  }
  console.log('THE ID ARRAY IS', idArray)

    useEffect(() => {
      const getAllRequest = async () => {
        const allRequestFromAPI = await fetchAllRequest();
        await setAllRequest(allRequestFromAPI);
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
    return await data;
  }

  if(allRequest){
        return (
            <>
              <h4>All Request here</h4>
              <h4>{allRequest.map((val,idx)=>
                <ul key={idx}>
                  {ownersArray.map((element, i)=>
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
            </h4>
            </>
        )
      }
    else return (
      <h2>is loading</h2>
    )
}

export default AllRequest;
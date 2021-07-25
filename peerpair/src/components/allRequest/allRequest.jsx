import React from 'react';
import { useEffect,useState } from "react";
import cookie from 'react-cookies';
import{Card,Button } from 'react-bootstrap';
import { Link  } from 'react-router-dom';
const token = cookie.load('auth');


const AllRequest = (props) =>{
  const [allRequest, setAllRequest] = useState([])

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
    return data;
  }

  if(allRequest){
        return (
            <>
              <h4>All Request here</h4>
              <h4>{allRequest.map((val,idx)=>{
              return (<Card className="text-center">
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
            })}</h4>
            </>
        )
      }
    else return (
      <h2>is loading</h2>
    )
}

export default AllRequest;
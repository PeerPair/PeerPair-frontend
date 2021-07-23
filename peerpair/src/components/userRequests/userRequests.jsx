import React from 'react';
import { Link  } from 'react-router-dom';
import{Card,Button } from 'react-bootstrap';
import { useEffect,useState } from "react";
import cookie from 'react-cookies';
const token = cookie.load('auth');


//all created requests by the user which rendered in his own profile
const YourRequests = (props) =>{
  const [requests, setRequests] = useState([])

    useEffect(() => {
      const getRequests = async () => {
        const requestsFromAPI = await fetchRequests();
        setRequests(requestsFromAPI);
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
  
    if(requests){
        return (
            <>
            <h4>{requests.map((val,idx)=>{
              return (<Card className="text-center">
              <Card.Header >{(val.accepted)?'Closed':'Open'}</Card.Header>
              <Card.Body>
                <Card.Title style={{wordSpacing:'10px'}}>{val.keyword.toUpperCase()}</Card.Title>
                <Card.Text>
                  {val.description}
                </Card.Text>
                <Link to={`/request/${val._id}`} ><Button>View Details</Button></Link>
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

export default YourRequests;
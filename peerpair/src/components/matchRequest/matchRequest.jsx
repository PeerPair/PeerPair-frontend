import React from 'react';
import { useEffect,useState } from "react";
import cookie from 'react-cookies';
import{Card , Button} from 'react-bootstrap';
import { Link  } from 'react-router-dom';
const token = cookie.load('auth');


const MatchRequest = (props) =>{
  const [matchRequest, setRequest] = useState([])

    useEffect(() => {
      const getMatchRequest = async () => {
        const MatchRequestFromAPI = await fetchMatchRequest();
        setRequest(MatchRequestFromAPI);
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
    return data;
  }

  if(matchRequest){
        return (
            <>
              <h4>Match Request here</h4>
              <h4>{matchRequest.map((val,idx)=>{
              return (<Card className="text-center">
              <Card.Header >{(val.accepted)?'Closed':'Open'}</Card.Header>
              <Card.Body>
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

export default MatchRequest;
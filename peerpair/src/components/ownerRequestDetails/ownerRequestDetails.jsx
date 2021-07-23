import React from 'react';
import { useLocation} from 'react-router';
import { connect } from 'react-redux';
import { getUserInfo } from '../../store/userInfo/action.js';
import RequestSubmitters from '../submitters/submitters.jsx';
import { useEffect,useState } from "react";
import cookie from 'react-cookies';
import OtherUserRequest from '../otherRequestDetails/otherRequestDetails'
import { Button } from 'react-bootstrap';
const token = cookie.load('auth');
  
//when the user want to view details for request
const RequestDetails = (props) =>{
    console.log(props,'props here');
    const [request, setRequest] = useState([{}]);

    useEffect(() => {
      const getRequest = async () => {
        const requestFromAPI = await fetchRequest();
        setRequest(requestFromAPI);
    }
    getRequest()
  }, [])

  useEffect(() => {
    props.getUserInfo();
  }, []);


  //function to get params from url
  let params;
  function usePathName() {
    let location = useLocation();
    useEffect(() => {
      const returnedParams =["pageview", location.pathname];
    }, [location]);
    console.log(location.pathname,'location');
    params = location.pathname ;
    return params ;
  }
 console.log(usePathName());


  // Fetch Request
  const fetchRequest = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}${params}`,{
      method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        }
    })
    console.log(params,'params');
    console.log(res,'res');
    const data = await res.json()
    console.log(data, 'get one request');
    return [data];
  }

  // delete request
  const deleteRequest = async (e) => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/request/${e.target.value}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      }
    })
  }
   
  const result = props.info.userInfo;
  console.log(result);
  let id = result.usertData._id;
  console.log(id,'****id****');
  
    if(request[0].user_ID === id){
          return (
              <>
                <h4>Request Details For Owner here</h4>
                <div>
                  <h4>{result.usertData.first_name} {result.usertData.last_name}</h4>
                  <h6>{result.usertData.location}</h6>
                  <h4>{result.usertData.peers} + Pairs</h4>
                </div>
                <hr></hr>
                <div>
                  <h4>{request[0].keyword}</h4>
                  <h6>Category | {request[0].category}</h6>
                  <p>{request[0].created_date}</p>
                  <p>{request[0].description}</p>
                  {(request[0].accepted)?<Button onClick={deleteRequest} value={request[0]._id}>delete</Button>:
                  <li><Button>edit</Button>
                  <Button onClick={deleteRequest} value={request[0]._id}>delete</Button></li>}
                </div>
                <RequestSubmitters Provider={request[0]}/>
              </>
          )
        }
        else {
          return (
              <>
              {/* <div>Hi</div> */}
              <OtherUserRequest data={request}/>
                {/* <h4>Request Details For Other here</h4>
                <div>
                  <h4>{result.usertData.first_name} {result.usertData.last_name}</h4>
                  <h6>{result.usertData.location}</h6>
                  <h4>{result.usertData.peers} + Pairs</h4>
                </div>
                <hr></hr>
                <div>
                  <h4>{request[0].keyword}</h4>
                  <h6>Category | {request[0].category}</h6>
                  <p>{request[0].created_date}</p>
                  <p>{request[0].description}</p>
                  <h6>{(request[0].accepted)?'Closed':<Button>Submit</Button>}</h6>
                </div> */}
              </>
          )
        }

  }


  
const mapStateToProps = state => ({
    info: state.userInfo,
  })
const mapDispatchToProps = { getUserInfo };
  
export default connect(mapStateToProps, mapDispatchToProps)(RequestDetails);
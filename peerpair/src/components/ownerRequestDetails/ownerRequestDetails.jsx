import React,{ useEffect,useState } from 'react';
import { useLocation} from 'react-router';
import { connect } from 'react-redux';
import { Redirect ,Link } from 'react-router-dom';
import { When } from 'react-if';
import { getUserInfo } from '../../store/userInfo/action.js';
import RequestSubmitters from '../submitters/submitters.jsx';
import cookie from 'react-cookies';
import OtherUserRequest from '../otherRequestDetails/otherRequestDetails'
import { Button,Alert,Spinner } from 'react-bootstrap';
import UpdateRequest from '../updateRequest/updateRequest.jsx';
const token = cookie.load('auth');
  
//when the user want to view details for request
const RequestDetails = (props) =>{
    console.log(props,'props here');
    const [request, setRequest] = useState([{}]);
    const [okay,setStatus] = useState(true);
    const [redirect,setRedirect] = useState(null);
    const [loading,setLoading] = useState(false);

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
    setLoading(true);
    const res = await fetch(`${process.env.REACT_APP_API_URL}/request/${e.target.value}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      }
    })
    setLoading(false);
    if(!res.ok) setStatus(false)
    else setRedirect('/')
  }
   
  const result = props.info.userInfo;
  console.log(result);
  let id = result.usertData._id;
  console.log(id,'****id****');
  
    if(request[0].user_ID === id){
          return (
              <>
                <When condition={redirect}><Redirect to={redirect}></Redirect></When>
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
                  {(request[0].accepted) ? <Button disabled>delete</Button> :
                  <li><UpdateRequest Provider={request[0]} updateData={(data)=> setRequest([data]) }/>
                  <Button onClick={deleteRequest} value={request[0]._id}>delete</Button></li>}
                </div>
                <RequestSubmitters Provider={request[0]}/>
                <When condition={loading}><Spinner animation="border" role="status"></Spinner></When>
                <When condition={!okay}>  <Alert  variant='danger'>something went wrong</Alert></When>
              </>
          )
        }
        else {
          return (
              <>
              <OtherUserRequest data={request}/>
              </>
          )
        }

  }


  
const mapStateToProps = state => ({
    info: state.userInfo,
  })
const mapDispatchToProps = { getUserInfo };
  
export default connect(mapStateToProps, mapDispatchToProps)(RequestDetails);
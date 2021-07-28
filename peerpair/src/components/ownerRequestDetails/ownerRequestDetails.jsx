import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { When, If, Then, Else } from 'react-if';
import { getUserInfo } from '../../store/userInfo/action.js';
import RequestSubmitters from '../submitters/submitters.jsx';
import cookie from 'react-cookies';
import { Button } from '@material-ui/core';
import UpdateRequest from '../updateRequest/updateRequest.jsx';
import TopBanner from './banner/banner.jsx';
import Nav from '../navbar/navbar.jsx';
import SideBanner from '../sideBanner/banner.jsx';
import { makeStyles } from '@material-ui/styles';
import SubmittersBanner from './banner/submittersBanner.jsx';
import './ownerRequestDetails.scss'
const useStyles = makeStyles((theme) => ({
  button: {
    textShadow: '2px 1px 3px rgba(24, 24, 24, 0.39)',
    color: 'white',
    backgroundColor: 'rgba(90, 214, 224,.7)',
    position: 'absolute',
    left: '18.5em',
    padding: '.3em .1em',
    marginTop: '1em',
    zIndex: '4',
  },
  button2: {
    left: '24.5em',
  },
}));

const token = cookie.load('auth');

//when the user want to view details for request
const RequestDetails = (props) => {
  const classes = useStyles();

  console.log(props, 'props here');
  const [request, setRequest] = useState([
    { _id: '', keyword: '', submitters: [] },
  ]);
  const [okay, setStatus] = useState(true);
  const [redirect, setRedirect] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getRequest = async () => {
      const requestFromAPI = await fetchRequest();
      setRequest(requestFromAPI);
    };
    getRequest();
  }, []);

  useEffect(() => {
    props.getUserInfo();
  }, []);

  //function to get params from url
  let params;
  function usePathName() {
    let location = useLocation();
    useEffect(() => {
      const returnedParams = ['pageview', location.pathname];
    }, [location]);
    console.log(location.pathname, 'location');
    params = location.pathname;
    return params;
  }
  console.log(usePathName());

  // Fetch Request
  const fetchRequest = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}${params}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });
    console.log(params, 'params');
    console.log(res, 'res');
    const data = await res.json();
    console.log(data, 'get one request');
    return [data];
  };

  // delete request
  const deleteRequest = async (e) => {
    setLoading(true);
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/request/${e}`,
      {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      }
    );
    setLoading(false);
    if (!res.ok) setStatus(false);
    else setRedirect('/');
  };

  const result = props.info.userInfo;
  console.log(result);
  let id = result.usertData._id;
  console.log(id, '****id****');

  return (
    <>
      <Nav />
      <TopBanner />
      <SideBanner data={request[0]} />
      <When condition={redirect}>
        <Redirect to={redirect}></Redirect>
      </When>
      <If condition={!(request[0].accepted)}>
        <Then>
          <div className='edite-delete-buttons'>

          <Button
        onClick={()=>{deleteRequest(request[0]._id)}}
        variant="contained"
        color='secondary'
        
      >
        <div>
        Delete
        </div>
      </Button>

        <Button variant="contained" >
        <div>
          <UpdateRequest Provider={request[0]} updateData={(d)=>{setRequest([d])}}/>
        </div>
      </Button>



          </div>

      <SubmittersBanner >
          <RequestSubmitters updateData={(data)=> setRequest([data])} Provider={request[0]} />
      </SubmittersBanner>

        </Then>
        <Else>
        <SubmittersBanner >
          <br></br>
          <h3 style = {{color:'red',fontWeight:'bold'}}>This Request is closed </h3>
          <br></br>
          <br></br>
          <br></br>
          <h4 style={{fontWeight:'bold'}}>Current Partner</h4>
          <RequestSubmitters updateData={(data)=> setRequest([data])} accepted={true} Provider={request[0]} />
        
        
        </SubmittersBanner>

        </Else>
      </If>

    </>
  );
};

const mapStateToProps = (state) => ({
  info: state.userInfo,
});
const mapDispatchToProps = { getUserInfo };

export default connect(mapStateToProps, mapDispatchToProps)(RequestDetails);

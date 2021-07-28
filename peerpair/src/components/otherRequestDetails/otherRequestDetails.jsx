import React from 'react';
import { useState, useEffect } from 'react';
import cookie from 'react-cookies';
import { If, Else, Then } from 'react-if';
import superagent from 'superagent';
import { getUserInfo } from '../../store/userInfo/action.js';
import { connect } from 'react-redux';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import funkyground from '../../assets/funkyground.png';
import manwalks from '../../assets/manwalks.png';
import Nav from '../navbar/navbar.jsx';
import OtherSideBanner from '../otherSideBanner/otherRequestSide.jsx';
import TopBanner from '../ownerRequestDetails/banner/banner.jsx';

import { useDispatch } from 'react-redux';
import {getNotifications} from '../../store/notification/reducer'

const API = process.env.REACT_APP_API_URL;

//when other user want to view details for one request
const OtherRequestDetails = (props) => {
  let dispatch = useDispatch();
  useEffect(()=>{
    const getNotification= async()=>{
      await dispatch(getNotifications());
      console.log('THE NOTIFICATION REDUCER RESULTS', props.NotificationResults )
    }
    getNotification();
  },[]);

  function usePathName() {
    let location = useLocation();
    useEffect(() => {
      const returnedParams = ['pageview', location.pathname];
    }, [location]);
    console.log(location.pathname, 'location');
    return location.pathname;
  }
  const [data, setData] = useState({ _id: '', keyword: '', submitters: [] });
  const [owner, setOwner] = useState({});
  const [userID, setUserID] = useState('');
  useEffect(() => {
    const test = async () => {
      await props.getUserInfo();


      setUserID(props.info.userInfo.usertData._id);
    };
    test();
  }, []);
  useEffect(() => {
    getOthersReq();
  }, [userID]);

  console.log('THE REQUEST ID IS ****', data._id);
  useEffect(() => {
    getReqOwner(data.user_ID);
  }, [data]);

  let params = usePathName();
  async function getOthersReq() {
    try {
      const token = cookie.load('auth');
      const response = await superagent
        .get(`${API}${params}`)
        .set({ Authorization: 'Bearer ' + token });
      console.log('THE REQUEST RESPONSE IS------', response.body);
      return await setData(response.body);
    } catch (error) {
      console.log('Failed To Get Others Request Data', error.message);
    }
  }

  async function getReqOwner(id) {
    try {
      const token = cookie.load('auth');
      const response = await superagent
        .get(`${API}/profile/${id}`)
        .set({ Authorization: 'Bearer ' + token });
      console.log('THE Request Owner IS------', response.body);
      return await setOwner(response.body);
    } catch (error) {
      console.log('Failed To Get The Request User Data', error.message);
    }
  }
  async function handleSubmit(reqId) {
    try {
      const token = cookie.load('auth');
      const response = await superagent
        .put(`${API}/submit/${reqId}`)
        .set({ Authorization: 'Bearer ' + token })
        .send({ id: userID });
      console.log('SUBMIT REQUEST RESPONSE', response);
      return await setData(response.body);
    } catch (error) {
      console.log('Failed To Submit To The Request ', error.message);
    }
  }
  async function handleUnSubmit(reqId) {
    try {
      const token = cookie.load('auth');
      const response = await superagent
        .put(`${API}/unsubmit/${reqId}`)
        .set({ Authorization: 'Bearer ' + token })
        .send({ id: userID });
      console.log('SUBMIT REQUEST RESPONSE', response);
      return await setData(response.body);
    } catch (error) {
      console.log('Failed To UN-Submit To The Request ', error.message);
    }
  }
  // console.log('signedIn User id',user._id );
  // console.log('request User id',data.user_ID );
  // console.log('THE SUBMITTERS ARRAY', data.submitters)

  // if(data){
  return (
    <>
      <div>
        <style>{'body { background-color: #f0eaf7; }'}</style>

        <Nav />
        <TopBanner />
        <OtherSideBanner owner={userID} data={data} unsubmitREQ={(reqId)=>{handleUnSubmit(reqId);}} submitREQ={(reqId)=>{handleSubmit(reqId);}} />
        <div className="purple-div"></div>
        <img className="dayflow" alt="dayflow" src={funkyground} />
        <img className="man-walk" alt="dayflow" src={manwalks} />
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  info: state.userInfo,
});
const mapDispatchToProps = { getUserInfo };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OtherRequestDetails);

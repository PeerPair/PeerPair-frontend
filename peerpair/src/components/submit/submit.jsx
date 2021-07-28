import React from 'react';
import { useState, useEffect } from 'react';
import cookie from 'react-cookies';
import { If, Else, Then } from 'react-if';
import superagent from 'superagent';
import { getUserInfo } from '../../store/userInfo/action.js';
import { connect } from 'react-redux';
import { useLocation } from 'react-router';
import { Link  } from 'react-router-dom';
import { useRadioGroup } from '@material-ui/core';
import { Icon } from "@iconify/react";

import plus from '@iconify-icons/uil/plus';
import check from '@iconify-icons/uil/check'

const API = process.env.REACT_APP_API_URL;

//when other user want to view details for one request
const Submit = (props) => {
    console.log('hi',props.request)
  const [data, setData] = useState(props.request);
  const [userID, setUserID] = useState('');

    useEffect(()=>{
        setData(props.request);
        const getUser =async()=>{
            await props.getUserInfo();
          if(props.info.userInfo.usertData)  setUserID(props.info.userInfo.usertData._id);

        }
        getUser();
    },[])
    useEffect(()=>{
        // setData(props.request);

        const getUser =async()=>{
            await props.getUserInfo();
            if(props.info.userInfo.usertData)   setUserID(props.info.userInfo.usertData._id);


        }
        getUser();
    },[data])








  async function handleSubmit(reqId) {
    try {
      const token = cookie.load('auth');
      const response = await superagent
        .put(`${API}/submit/${reqId}`)
        .set({ Authorization: 'Bearer ' + token })
        .send({ id:userID });
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
      console.log('UNSUBMIT REQUEST RESPONSE', response);
      return await setData(response.body);
    } catch (error) {
      console.log('Failed To UN-Submit To The Request ', error.message);
    }
  }

 return (
    <>

      <If condition={data.submitters.includes(userID) } >
        <Then>
        <Icon icon={check} onClick={() => handleUnSubmit(data._id)}/>
 
        </Then>
        <Else>
        <Icon icon={plus}  onClick={() => handleSubmit(data._id)}/>
        </Else>
      </If>
    </>
  )

};

const mapStateToProps = (state) => ({
  info: state.userInfo,
});
const mapDispatchToProps = { getUserInfo };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Submit);

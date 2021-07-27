import React from 'react';
import { useState, useEffect } from 'react';
import cookie from 'react-cookies';
import { If, Else, Then } from 'react-if';
import superagent from 'superagent';
import { getUserInfo } from '../../store/userInfo/action.js';
import { connect } from 'react-redux';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

const API = process.env.REACT_APP_API_URL;

//when other user want to view details for one request
const Submit = (props) => {

  const [data, setData] = useState(props.request);

    useEffect(()=>{
        const getUser =async()=>{
            await props.getUserInfo();
        }
        getUser();
    },[])








  async function handleSubmit(reqId) {
    try {
      const token = cookie.load('auth');
      const response = await superagent
        .put(`${API}/submit/${reqId}`)
        .set({ Authorization: 'Bearer ' + token })
        .send({ id: props.info.usertData._id });
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
        .send({ id: props.info.usertData._id });
      console.log('SUBMIT REQUEST RESPONSE', response);
      return await setData(response.body);
    } catch (error) {
      console.log('Failed To UN-Submit To The Request ', error.message);
    }
  }

 if(props.info.usrInfo) return (
    <>

      <If condition={data.submitters.includes(props.info.usrInfo.usertData._id)}>
        <Then>
          <button onClick={() => handleUnSubmit(data._id)}>Un-Submit</button>
        </Then>
        <Else>
          <button onClick={() => handleSubmit(data._id)}>Submit</button>
        </Else>
      </If>
    </>
  )

  else return <div>...</div>
};

const mapStateToProps = (state) => ({
  info: state.userInfo,
});
const mapDispatchToProps = { getUserInfo };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Submit);

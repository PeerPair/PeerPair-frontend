import React from 'react';
import { useState, useEffect } from "react";
import cookie from "react-cookies";
import { When, If, Else, Then } from "react-if";
import superagent from 'superagent';
import { useContext } from 'react';
import { LoginContext } from '../../context/authContext';
import { getUserInfo } from '../../store/userInfo/action.js';
import { connect } from 'react-redux';
import { Redirect, useLocation } from 'react-router';
import { Link } from 'react-router-dom';

const API = process.env.REACT_APP_API_URL;

//when other user want to view details for one request
const OtherRequestDetails = (props) =>{
  function usePathName() {
    let location = useLocation();
    useEffect(() => {
      const returnedParams =["pageview", location.pathname];
    }, [location]);
    console.log(location.pathname,'location');
    return location.pathname ;
  }
  const contextType = useContext(LoginContext);
  const [data, setData]= useState({submitters:[]});
  const [owner, setOwner] = useState([]);
  
  useEffect(() => {
    const test = async()=>{
     await  props.getUserInfo();
    getOthersReq();
    }
    test();
  }, []);


console.log('THE REQUEST ID IS ****', data._id)
useEffect(()=>{
  getReqOwner(data.user_ID);
}, [data]);

const user = props.info.userInfo.usertData;
console.log('USER DATA===>', user);

let params = usePathName();
  async function getOthersReq(){
    try{
        const token = cookie.load('auth');
        const response = await superagent.get(`${API}${params}`).set({'Authorization' : 'Bearer '+ token});
        console.log('THE REQUEST RESPONSE IS------' , response.body);
        return await setData(response.body)
    } catch(error){
                console.log('Failed To Get Others Request Data', error.message)
            }
}

async function getReqOwner(id){
  try{
      const token = cookie.load('auth');
      const response = await superagent.get(`${API}/profile/${id}`).set({'Authorization' : 'Bearer '+ token});
      console.log('THE Request Owner IS------' , response.body);
      return await setOwner(response.body)
  } catch(error){
              console.log('Failed To Get The Request User Data', error.message)
          }
}
async function handleSubmit(reqId){
  try {
    const token = cookie.load('auth');
    const response = await superagent.put(`${API}/submit/${reqId}`).set({'Authorization' : 'Bearer '+ token}).send({id : props.info.userInfo.usertData._id});
    console.log('SUBMIT REQUEST RESPONSE', response);
    return await setData(response.body);
  }catch(error){
    console.log('Failed To Submit To The Request ', error.message)
  }
}
async function handleUnSubmit(reqId){
  try {
    const token = cookie.load('auth');
    const response = await superagent.put(`${API}/unsubmit/${reqId}`).set({'Authorization' : 'Bearer '+ token}).send({id : props.info.userInfo.usertData._id});
    console.log('SUBMIT REQUEST RESPONSE', response)
    return await setData(response.body);
  }catch(error){
    console.log('Failed To UN-Submit To The Request ', error.message)
}
}
// console.log('signedIn User id',user._id );
// console.log('request User id',data.user_ID );
// console.log('THE SUBMITTERS ARRAY', data.submitters)

// if(data){
        return (
            <>
            <h3>Request Owner Information</h3>
            <Link to={`/profile/${data.user_ID}`} ><img src="http://via.placeholder.com/200x200" alt="placeHolder" /></Link>
             <h4>{owner.first_name} {owner.last_name}
             </h4>
             <If condition={data.accepted === true}>
               <Then>
             <h6>This Request Has Been Accepted</h6>
             </Then>
             <Else>
             <h6>This Request Is Not Accepted Yet</h6>
             </Else>
             </If>
             <p>Submitters Number : {data.submitters.length}</p>
             <p>Keyword: {data.keyword}</p>
             <p>Category: {data.category}</p>
             <p>Description: {data.description}</p>
             <p>Created_date: {data.created_date}</p>
            <If condition={data.submitters.includes(props.info.userInfo.usertData._id)}>
              <Then>
          <button onClick={()=> 
                handleUnSubmit(data._id)}> 
            Un-Submit</button>
             </Then>
             <Else>
             
             <button onClick={()=> handleSubmit(data._id)}>Submit</button>
             </Else>
             </If>
            </>
        )

}

const mapStateToProps = state => ({
  info: state.userInfo,
})
const mapDispatchToProps = { getUserInfo };

export default connect(mapStateToProps, mapDispatchToProps)(OtherRequestDetails);

import React from 'react';
import { connect } from 'react-redux';
import { getUserInfo } from '../../store/userInfo/action.js';
import { useEffect } from "react";


const UserInfo = (props) =>{
  useEffect(() => {
    props.getUserInfo();
  }, []);
  
  const data = props.info.userInfo.usertData ;
  console.log(props.info,'props.info');
  if(data){
        return (
            <>            
              <h4>User Info here</h4>
              <h4>{data.first_name} {data.last_name}</h4>
              <h6>{data.location}</h6>
              <h6>{data.education}</h6>
              <p>{data.user_bio}</p>
              <h5>{data.first_name}'s Interests</h5>
              <p>{data.interests}</p>
              <h4>{data.peers}+ Pairs</h4> 
            </>
        )
  }
  else return (
    <h4>"is loading"</h4>
  )
}

const mapStateToProps = state => ({
  info: state.userInfo,
})
const mapDispatchToProps = { getUserInfo };

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);


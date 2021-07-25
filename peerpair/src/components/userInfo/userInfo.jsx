import React,{ useEffect } from 'react';
import { connect } from 'react-redux';
import { getUserInfo } from '../../store/userInfo/action.js';
import {If,Else,Then} from 'react-if';
import Avatar from 'react-avatar';
import UpdateUserInfo from '../updateUserInfo/updateUserInfo.jsx';


const UserInfo = (props) =>{
  useEffect(() => {
    props.getUserInfo();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const data = props.info.userInfo.usertData ;
  console.log(props.info,'props.info');
  if(data){
        return (
            <> 
              <UpdateUserInfo Provider={data}/>         
              <h4>User Info here</h4>
              <If condition={data.profile_image}>
              <Then>
              <img alt='profileImage' src={'data:image/jpg;base64,'+data.profile_image}/>
              </Then>
              <Else>
          <Avatar name={data.first_name + ' ' + data.last_name} maxInitials={2}/>
              </Else>
            </If>

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


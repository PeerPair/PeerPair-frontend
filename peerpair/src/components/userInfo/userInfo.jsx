import React,{ useEffect } from 'react';
import { connect } from 'react-redux';
import { getUserInfo } from '../../store/userInfo/action.js';
import {If,Else,Then} from 'react-if';
import Avatar from 'react-avatar';
import { Icon } from "@iconify/react";
import pen from "@iconify-icons/uil/pen";
import Chips from '../chip/chip.jsx'
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
  
                  <aside className='ProfileAside'>
                                  <If condition={data.profile_image}>
              <Then>
              <img className="person" alt='profileImage' src={'data:image/jpg;base64,'+data.profile_image}/>
              </Then>
              <Else>
          <Avatar className="person" name={data.first_name + ' ' + data.last_name} maxInitials={2} size={150}/>
              </Else>
            </If>

        <div className="info">
          <p>{data.first_name} {data.last_name}</p>
          <p>{data.location}</p>
          <p></p>
        </div>

        <div className="bio">
          <p>
            
          {data.user_bio}
          </p>
        </div>

        <Chips className="chip" intrests={data.interests.split(' ')}></Chips>
        <div className="circle-icon edit-icon" > 
   <UpdateUserInfo Provider={props.info.userInfo} />         
  </div>
      </aside>

          //     <h4>User Info here</h4>
          //     <If condition={data.profile_image}>
          //     <Then>
          //     <img alt='profileImage' src={'data:image/jpg;base64,'+data.profile_image}/>
          //     </Then>
          //     <Else>
          // <Avatar name={data.first_name + ' ' + data.last_name} maxInitials={2}/>
          //     </Else>
          //   </If>

          //     <h4>{data.first_name} {data.last_name}</h4>
          //     <h6>{data.location}</h6>
              
          //     <h6>{data.education}</h6>
          //     <p>{data.user_bio}</p>
          //     <h5>{data.first_name}'s Interests</h5>
          //     <p>{data.interests}</p>
          //     <h4>{data.peers}+ Pairs</h4> 
    
        )
  }
  else return (
    <aside className='ProfileAside'>"is loading"</aside>
  )
}

const mapStateToProps = state => ({
  info: state.userInfo,
})
const mapDispatchToProps = { getUserInfo };

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);


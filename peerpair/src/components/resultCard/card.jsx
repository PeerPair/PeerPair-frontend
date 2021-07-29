import React from "react";
import RequestCard from "../reqCard/reqCard";
import "./othersReqCard.css";
import { Icon } from "@iconify/react";
import plus from '@iconify-icons/uil/plus';
import person from "../../assets/person1.png";
import messege from '@iconify-icons/uil/comment';
import { Link } from "react-router-dom";
import Submit from "../submit/submit";

export default function OthersReqCard(props) {
  console.log(props.owner);
  return (
    <div className="others-card">
      <div className="user-part">
        <Link style={{textDecoration:'none'}} to={'/profile/'+props.requestData.user_ID}>
        
        <div className="user-data">
          <img className="user-image" src={(props.owner.profile_image)?( 'data:image/jpg;base64,'+props.owner.profile_image):person} alt="user" />
          <div className="user-text">
            <p>{props.owner.first_name +' '+ props.owner.last_name}</p>
            <p>{props.owner.location}</p>
          </div>
        </div>
        </Link>
        <div  className="user-icons">
          <div className="user-icon">
            {/* <Icon icon={plus} /> */}
            <Submit request={props.requestData}/>
          </div>
          <div className="user-icon">
           <Link to={'/chat/'+props.requestData.user_ID}><Icon icon={messege} /></Link> 
        </div>

        </div>
      </div>
      <Link style={{textDecoration:'none'}} to={'/request/'+props.requestData._id}>
      <RequestCard data={props.requestData} hidden={true} />
      </Link>
    </div>
  );
}

import React from "react";
import "./banner.css";
import leaf from "../../assets/leaf1.png";
import leaf2 from "../../assets/leafP1.png";
import { Icon } from "@iconify/react";
import heartbeat from "@iconify-icons/uil/heartbeat";

import Study from "@iconify-icons/uil/graduation-cap";
import Gaming from "@iconify-icons/uil/laptop";
import Sports from "@iconify-icons/uil/football-ball";
import Traveling from "@iconify-icons/uil/plane";
import Cooking from "@iconify-icons/uil/utensils";
import halfCircle from '../../assets/halfCircle.png'

let categories={'Study Group':Study,Gaming,Sports,Traveling,Cooking}

export default function SideBanner(props) {
  return (

    <div>
      <div className="side-banner">
        <div className="side-data">
          <p>{props.data.keyword.toUpperCase()}</p>
          <div className="side-category">
            <div className="side-category-icon">
              <Icon icon={categories[props.data.category]} />
            </div>
            <p>{props.data.category}</p>
          </div>
          <p className="side-date">{props.data.created_date} </p>
        </div>
        <img
          alt="ladder"
          className="side-req-image"
          src={(props.data.image)?`data:image/jpg;base64,${props.data.image}`:"https://i.stack.imgur.com/y9DpT.jpg"}
        />
        <div className="side-desc">
          <p>
          {props.data.description +" "}
          </p>
        </div>
      </div>

      <div className="side-number">
        <p>{props.data.submitters.length}</p>
        <p className="submitters-p">Submits</p>
      </div>
      
        {/* <div className='whiteDiv'>
          hello */}
      {/* <div className="side-circle side-circle2 "> */}
      <img className="side-circle2" alt="ladder" src={halfCircle} />

        {/* </div> */}
      {/* </div> */}
      <div className="side-circle"></div>
      <img className="ladder" alt="ladder" src={leaf} />
      <img className="leafs2" alt="ladder" src={leaf2} />
    </div>
  );
}

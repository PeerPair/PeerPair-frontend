import React from 'react'
import './reqBanner.css'

// import RequestCard from './requestCard'
import { Icon } from '@iconify/react';
import slidersV from '@iconify-icons/uil/sliders-v';
import plus from '@iconify-icons/uil/plus';


export default function ReqBanner(props) {
  return (
<div className="mycontainer">
<div className="head">
  <p> Published requests </p>
  <div > 
  </div>
  </div>

<div className="requests-sec">

{props.children}

    </div>
    {/* <div className="circle-icon plus-icon" > 
  <Icon icon={plus} /> 
  </div> */}
        </div>
  )
}

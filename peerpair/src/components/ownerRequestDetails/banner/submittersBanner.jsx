import React from 'react'
import '../../reqBanner/reqBanner.css'
import { Icon } from '@iconify/react';
import slidersV from '@iconify-icons/uil/sliders-v';
import './submittersBanner.css'

export default function SubmittersBanner(props) {
  return (
<div className="mycontainer mycontainer3">
<div className="head head2">
  <p> Request Submitters </p>
  {/* <div className="circle-icon setting-icon setting-icon2" > 
  <Icon icon={slidersV} /> 
  </div> */}
  </div>

<div className="requests-sec submitters-div">
{props.children}

    </div>

        </div>
  )
}

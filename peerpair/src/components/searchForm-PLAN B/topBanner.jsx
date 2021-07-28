import React from 'react'
import back from '../../assets/shape4.png'
import cloud from '../../assets/mycloud3.png'
import logo from '../../assets/logo2.png'

export default function TopBanner() {
  return (
    <div className="topBanner-div" >

      <div className="banner-heading"> <span>|</span> Find Requests
</div>
          <img alt="bg" src={logo} className="logo logo2"/>
      <div className="container-cloud1">
          <img alt="bg" src={cloud} className="clouds1"/>
      </div>
      <div className="container-cloud2">
          <img alt="bg" src={cloud} className="clouds2"/>
      </div>
      <div className="container-cloud4">
          <img alt="bg" src={cloud} className="clouds4"/>
      </div>
      <div className="container-cloud5">
          <img alt="bg" src={cloud} className="clouds5"/>
      </div>
      <div className="container-cloud3">
          <img alt="bg" src={cloud} className="clouds3"/>
      </div>
      <div className="container-cloud6">
          <img alt="bg" src={cloud} className="clouds6"/>
      </div>
    <img alt="bg" src={back} className="ban-bg"/>
    </div>
  )
}

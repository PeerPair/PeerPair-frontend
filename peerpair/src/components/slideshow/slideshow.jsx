import React from 'react';
import { Fade } from 'react-slideshow-image';
import char1 from '../../assets/c1.png';
import char2 from '../../assets/e1.png';
import char3 from  "../../assets/p2.png"


const fadeImages = [
  char1,char2,char3
];

const fadeProperties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: false,
  indicators: true,
  onChange: (oldIndex, newIndex) => {
    console.log(`fade transition from ${oldIndex} to ${newIndex}`);
  }
}

export default function Slideshow () {
  return (
    <div className="">
      <Fade>
        <div className="each-fade">
          <div className="">
            <img className="slideshow" alt="first" src={fadeImages[0]} />
          </div>
        </div>
        <div className="each-fade">
          <div className="image-container">
            <img  className="slideshow" alt="2"  src={fadeImages[1]} />
          </div>
        </div>
        <div className="each-fade">
          <div className="image-container">
            <img  className="slideshow" alt="3" src={fadeImages[2]} />
          </div>
        </div>
      </Fade>
    </div>
  )
}
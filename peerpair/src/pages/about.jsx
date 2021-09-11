import React from 'react';
import TopBanner from '../../src/components/aboutTopBanner/topBanner.jsx';
import AboutTeam from '../../src/components/aboutTeam/aboutTeam';
import "../design/about.css";


const About = (props)=>{
    return(
        <div>
           <style>{'body { background-color: #dac8f3; }'}</style>
           <TopBanner/>
           <AboutTeam/>
        </div>
    )
}

export default About ;
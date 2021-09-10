import React from 'react';
import TopBanner from '../../src/components/aboutTopBanner/topBanner.jsx';
import ContactUs from '../../src/components/contactUs/contactUs.jsx';
import "../design/contactUs.css";
import contact from "../assets/contact.jpg";
import { Link } from 'react-router-dom';
import logo from "../assets/logo2.png"


const Contact = (props) => {
    return (
        <div>
            <style>{'body { background-color: rgb(193 179 215); }'}</style>
            <img className="shape" alt="shape" src="/static/media/shape.47c181b8.png"></img>
            <img className="green" alt="shape" src="/static/media/green.36cc7592.png"></img>
            <img className="logo" alt="shape" src={logo} />
            <nav className="landing">
                <div><Link to="/">Home</Link></div>
                <div><Link to="/about">About</Link></div>
                <div><Link to="/signin">Sign in</Link></div>
            </nav>
            <div className="contactUs">
                <ContactUs />
                <img src={contact} className="con"></img>
            </div>
        </div>
    )
}

export default Contact;
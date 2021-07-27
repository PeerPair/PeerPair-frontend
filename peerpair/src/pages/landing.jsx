import "./landingPage.css";
import NavLanding from "../components/navLanding/navLanding.jsx";
import Slideshow from "../components/slideshow/slideshow.jsx"; 
import shape from "../assets/shape.png";
import green from "../assets/green.png";
import people from "../assets/allimages5.png";
import leaf2 from "../assets/leafP2.png";
import leaf1 from "../assets/leafP1.png";
import holding from "../assets/holding.png";
import cloud from "../assets/cloud.png";
import logo from  "../assets/logo2.png"
import { Link } from "react-router-dom";


export default function LandingPage() {

   
  return (
    <div>
    <style>{'body { background-color: #d3baf5; }'}</style>
      <NavLanding />
      <Slideshow/>
        
      <Link to='/signup'>=<button className="button">Sign up </button></Link>
        
        <Link to='/signin'>
        
      <button className="button button2">Sign in</button>
        </Link>

      <img className="logo" alt="shape" src={logo} />

      <img className="green" alt="shape" src={green} />

      <img className="leaf2" alt="shape" src={leaf2} />

      <img className="leaf1" alt="shape" src={leaf1} />

      <img className="cloud2" alt="shape" src={cloud} />

      <h1 className="heading">PeerPair</h1>

      <h2 className="heading2">
        Boundless chance of finding a partner in any activity. We provide the
        company you are looking for and a chance for making friendships that
        lasts for a life time{" "}
      </h2>
      <img className="cloud" alt="shape" src={cloud} />

      <img className="holding" alt="shape" src={holding} />
      <img className="shape" alt="shape" src={shape} />

      <img className="people" alt="shape" src={people} />
    </div>
  );
}

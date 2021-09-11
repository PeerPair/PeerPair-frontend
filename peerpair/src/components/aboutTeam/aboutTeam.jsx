import React from 'react';
import { Link } from 'react-router-dom';
import mousa from '../../assets/1m.png';
import yasmin from '../../assets/1y.png';
import furat from '../../assets/1f.png';
import farah from '../../assets/1ff.png';
import linkedin from '../../assets/linkedin.png';
import git from '../../assets/git1.png';
import { Fade } from 'react-slideshow-image';


const AboutTeam = (props) => {
    return (
        <div>
            <nav className="landingNavFRH">
                <div><Link to="/">Home</Link></div>
                <div><Link to="/contact">Contact Us</Link></div>
                <div><Link to="/signin">Sign in</Link></div>
            </nav>
            <img class="green" alt="shape" src="/static/media/green.36cc7592.png"></img>
            <div className="aboutContainer">
                <div className="logoAboutText"><h2></h2><p>Meet PeerPair Team !!</p></div>
                <Fade>
                    <div>
                        <div className="nameA">
                            <h2>Mousa <br></br>Sbbah</h2>
                            <p>Full-Stack Developer With Background  <br></br> In Electrical Engineering</p>
                        </div>
                        <div className="imgAbout">
                            <img alt="mousa" src={mousa}></img>
                        </div>
                        <div className="aboutIcon">
                            <a href="https://www.linkedin.com/in/mousasabah/" target="_blank" rel="noopener noreferrer" ><img alt="linkedin" src={linkedin} /></a>
                            <a href="https://github.com/MousaSbbah" target="_blank" rel="noopener noreferrer" ><img alt="git" className="github" src={git} /></a>
                        </div>
                    </div>
                    <div>
                        <div className="nameA">
                            <h2>Furat <br></br>Malkawi</h2>
                            <p>Full-Stack Developer With Background  <br></br> In Medical Engineering</p>
                        </div>
                        <div className="imgAbout">
                            <img alt="furat" src={furat}></img>
                        </div>
                        <div className="aboutIcon">
                            <a href="https://www.linkedin.com/in/furatmalkawi/" target="_blank" rel="noopener noreferrer" ><img alt="linkedin" src={linkedin} /></a>
                            <a href="https://github.com/furatmalkawi29" target="_blank" rel="noopener noreferrer" ><img alt="git" className="github" src={git} /></a>
                        </div>
                    </div>
                    <div>
                        <div className="nameA">
                            <h2>Yasmin <br></br>Al-Khateeb</h2>
                            <p>Full-Stack Developer With Background  <br></br> In Pharmacy</p>
                        </div>
                        <div className="imgAbout">
                            <img alt="yasmin" src={yasmin}></img>
                        </div>
                        <div className="aboutIcon">
                            <a href="https://www.linkedin.com/in/yasmin-al-khateeb/" target="_blank" rel="noopener noreferrer" ><img alt="linkedin" src={linkedin} /></a>
                            <a href="https://github.com/yasmeenokh" target="_blank" rel="noopener noreferrer" ><img alt="git" className="github" src={git} /></a>
                        </div>
                    </div>
                    <div>
                        <div className="nameA">
                            <h2>Farah <br></br>Al-Wahaibi</h2>
                            <p>Full-Stack Developer With Background  <br></br> In Architectural Engineering</p>
                        </div>
                        <div className="imgAbout">
                            <img alt="farah" src={farah}></img>
                        </div>
                        <div className="aboutIcon">
                            <a href="https://www.linkedin.com/in/farah-wahaibi/" target="_blank" rel="noopener noreferrer" ><img alt="linkedin" src={linkedin} /></a>
                            <a href="https://github.com/farahalwahaibi" target="_blank" rel="noopener noreferrer" ><img alt="git" className="github" src={git} /></a>
                        </div>
                    </div>
                </Fade>
            </div>
        </div>
    )
}

export default AboutTeam;
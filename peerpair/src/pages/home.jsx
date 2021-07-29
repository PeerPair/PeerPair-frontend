import React from 'react';
import "./home.css";
import UserInfo from '../components/userInfo/userInfo.jsx';
import YourRequests from '../components/userRequests/userRequests.jsx';
import SearchBar from '../components/searchBar/searchBar'
import person from "../assets/person1.png";
import circle from "../assets/greens.png";
import msg from "../assets/plane4.png";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Navbar from '../components/navbar/navbar.jsx';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    button: {
      textShadow: "2px 1px 3px rgba(24, 24, 24, 0.39)",
      color:"white",
      width:"11.8em",
      backgroundColor:"rgba(90, 214, 224,.7)",
    },
  }));
//for route '/' home page for user
const UserProfilePage = () =>{
  const info = useSelector(state => state.userInfo)
    const classes = useStyles();
        return (
            <>

              <div className="profile-page">
      <style>{'body { background-color: #ede3fa; }'}</style>
      <Navbar />
      <UserInfo />
      <div className="container">
        <div className="content">
            <div className="search">
            <SearchBar style={{visibility:'hidden'}}/>
            <Link to='/request' style={{ textDecoration: 'none' }}>
            <Button
        variant="contained"
        className={`${classes.button} + newbtn`}
        startIcon={<AddIcon />}
      >
        New Request
        </Button>
            </Link>
            </div>

            <div className="other">
              
              <div className="banner">
              <img className="circle" src={circle} alt="green" />
              <img className="msg " src={msg} alt="green" />
              <div className="number">
                
                <p>
                  <span>+</span>{(info.userInfo.usertData)?info.userInfo.usertData.peers:'0'}
                </p>
                <p>Pairs</p>
              </div>
              </div>

              <div className="requests">
              <YourRequests/>
              </div>
            </div>
        </div>
      </div>
    </div>
  
                {/* <UserInfo/>
                <NewRequestBtn/> */}
            </>
        )
}

export default UserProfilePage;
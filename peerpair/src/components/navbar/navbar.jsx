import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { When } from 'react-if';
import { useContext } from 'react';
import { Dropdown } from 'react-bootstrap';
import { LoginContext } from '../../context/authContext';
import cookies from 'react-cookies';
import './navbar.css';
import { Notifications } from '@material-ui/icons';
import { FaUser, FaCog, FaCompass , FaBell , FaEnvelope } from 'react-icons/fa';
import { Icon } from "@iconify/react";
import signOut from "@iconify-icons/uil/sign-out-alt";

// import './navbar.scss'
const Navbar = (props) => {
  const [redirect, setredirect] = useState(false);
  const [notify, setNotify] = useState({
    newMessages: [],
    all: [],
  });
  
  const contextType = useContext(LoginContext);
  useEffect(() => {
    const getData = async () => {
      let notificData = await fetchNotifications();
      setNotify({...notify,...notificData});
    };
    getData();
  }, []);
  console.log('bye', notify);
  const fetchNotifications = async () => {
    console.log('hi');
    let token = cookies.load('auth');
    const res = await fetch(process.env.REACT_APP_API_URL + '/myNotification', {
      method: 'get',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });

    let data = await res.json();
    return data;
  };

  return (
    <nav className="mynav">
      <ul className="icons">
      {/* <div className="category-icon">
            <Icon icon={signOut} />
          </div> */}
        <li><div> <Icon icon={signOut} onClick={contextType.logout} type='button' />
         </div>
</li>
        <li> <Link to="/"><FaUser color="#333333" size={23}/></Link> </li>
        <li> <Link to="/explore"><FaCompass color="#333333" size={23}/></Link> </li>
        <li> <Dropdown className="d-inline mx-2">
          <Dropdown.Toggle  as={'div'} id="dropdown-autoclose-true">
            <Notifications />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {notify.newMessages.map((val) => {
              return (
                <Link to={'/request/'+val.split('/')[2]}>
                  <Dropdown.Item  as='div' disable={true}>
                  {val.split('/')[3]} <Link to={'/chat/'+val.split('/')[1]}>Chat</Link>
                </Dropdown.Item>
                </Link>
              );
            })}
          <Dropdown.Divider></Dropdown.Divider>
            {notify.all.map((val) => {
              return (
                <Link to={'/request/'+val.split('/')[2]}>
                  <Dropdown.Item  as='div' disable={true}>
                  {val.split('/')[3]} <Link to={'/chat/'+val.split('/')[1]}>Chat</Link>
                </Dropdown.Item>
                </Link>
              );
            }).reverse()}
          </Dropdown.Menu>
        </Dropdown> </li>
        <li> <Link to="/chat"><FaEnvelope color="#333333" size={23}/> </Link> </li>
      </ul>
    </nav>
  )
};

export default Navbar;




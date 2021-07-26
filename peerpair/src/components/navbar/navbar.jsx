import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { When } from 'react-if';
import { useContext } from 'react';
import { Dropdown } from 'react-bootstrap';
import { LoginContext } from '../../context/authContext';
import cookies from 'react-cookies';
import './navbar.scss';
import { Notifications } from '@material-ui/icons';
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
    <>
      <nav>
        <button>
          <Link to="/">home</Link>
        </button>
        <button>
          <Link to="/settings">settings</Link>
        </button>
        <Dropdown className="d-inline mx-2">
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
        </Dropdown>
        <button>
          <Link to="/search">search</Link>
        </button>
        <button>
          <Link to="/explore">explore</Link>
        </button>
        <button onClick={contextType.logout} type="button">
          <Link to="/signin">LogOut</Link>
        </button>
      </nav>
      <When condition={redirect}>
        <Redirect to="/notification" />
      </When>
    </>
  );
};

export default Navbar;

import React ,{useState} from 'react';
import { Link, Redirect } from 'react-router-dom';
import { When } from 'react-if';
import { useContext } from 'react';
import { LoginContext } from '../../context/authContext';
import Notifications from 'react-notifications-menu'
import './navbar.scss';
const Navbar = (props) =>{
  const [redirect, setredirect] = useState(false)
  const contextType = useContext(LoginContext);
    return (
        <>
          <nav>
            <button><Link to="/">home</Link></button>
            <button><Link to="/settings">settings</Link></button>
            <Notifications
  data={[
    {
      // image: logo,
      message: 'Kameshwaran S had shared a feedback with you.',
      detailPage: '/',
    },
    {
      // image: logo,
      message: (
        <p>
          Kameshwaran S had shared a{' '}
          <span style={{ color: '#7ac2fa' }}>feedback</span> with you.
        </p>
      ),
      detailPage: '/',
    },
  ]}
  header={{
    title: 'Notifications',
    option: { text: 'View All', onClick: () => {setredirect(true);} },
  }}
  classNamePrefix="okrjoy"
/>
            <button><Link to="/search">search</Link></button>
            <button><Link to="/explore">explore</Link></button>
            <button onClick={contextType.logout} type='button'><Link to="/signin">LogOut</Link></button>
          </nav>
          <When condition={redirect}><Redirect to='/notification'/></When>
        </>
    )
}

export default Navbar ;

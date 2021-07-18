import React from 'react';
import UserInfo from '../components/userInfo/userInfo.jsx';
import NewRequestBtn from '../components/newRequestBtn/newRequestBtn.jsx';
import YourRequests from '../components/userRequests/userRequests.jsx';

//for route '/' home page for user
const UserProfilePage = (props) =>{
    return (
        <>
            <UserInfo/>
            <NewRequestBtn/>
            <YourRequests/>
        </>
    )
}

export default UserProfilePage;
import React from 'react';
import OwnerRequestDetails from '../../src/components/ownerRequestDetails/ownerRequestDetails.jsx';
import RequestSubmitters from '../../src/components/submitters/submitters.jsx';


//for route '/request/id' 
const UserRequestPage = (props) =>{
    return (
        <>
            <OwnerRequestDetails/>
            <RequestSubmitters/>
        </>
    )
}

export default UserRequestPage;
import React from 'react';
import OwnerRequestDetails from '../../src/components/ownerRequestDetails/ownerRequestDetails.jsx';
import RequestSubmitters from '../../src/components/submitters/submitters.jsx';
import OtherRequestDetails from '../../src/components/otherRequestDetails/otherRequestDetails';

//for route '/request/id' 
const UserRequestPage = (props) =>{
    return (
        <>
            <OwnerRequestDetails/>
            <RequestSubmitters/>
            <OtherRequestDetails/>
        </>
    )
}

export default UserRequestPage;
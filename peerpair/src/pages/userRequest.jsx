import React, {useEffect,useState}from 'react';
import {connect} from 'react-redux';
import { getUserInfo } from '../store/userInfo/action.js';
import RequestDetails from '../../src/components/ownerRequestDetails/ownerRequestDetails.jsx';
import OwnerRequestDetails from '../../src/components/ownerRequestDetails/ownerRequestDetails.jsx';
import RequestSubmitters from '../../src/components/submitters/submitters.jsx';
import OtherRequestDetails from '../../src/components/otherRequestDetails/otherRequestDetails';
import {If,Else,Then} from 'react-if'

//for route '/request/id' 
const UserRequestPage = (props) =>{
    const [owner, setOnwer] = useState(false)
    let request;
    useEffect(() => {
        props.getUserInfo();

        // request = props.info.allRequest.filter(val=>(val._id ===  props.match.params.id))

    }, [])
    useEffect(() => {
        console.log(props.info.userInfo.allRequest)
        request = props.info.userInfo.allRequest.filter(val=>(val._id ===  props.match.params.id))
        if(request.length) setOnwer(true);

    }, [props.info.userInfo])
    console.log(request)

    return (
        <>
            <If condition={owner}>
                <Then>
                <OwnerRequestDetails/>
                <div>then</div>
                </Then>
                <Else>
                    <div>else</div>
             <OtherRequestDetails/>
                </Else>

            </If>
            {/* <RequestSubmitters/> */}

        </>
    )
}

const mapStateToProps = state => ({
    info: state.userInfo,
  })
const mapDispatchToProps = { getUserInfo };
  
export default connect(mapStateToProps, mapDispatchToProps)(UserRequestPage);

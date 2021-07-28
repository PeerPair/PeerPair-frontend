import React, { useEffect, useState } from 'react';
import { connect , useDispatch } from 'react-redux';
import { getUserInfo } from '../store/userInfo/action.js';
import RequestDetails from '../../src/components/ownerRequestDetails/ownerRequestDetails.jsx';
import OwnerRequestDetails from '../../src/components/ownerRequestDetails/ownerRequestDetails.jsx';
import RequestSubmitters from '../../src/components/submitters/submitters.jsx';
import OtherRequestDetails from '../../src/components/otherRequestDetails/otherRequestDetails';
import { If, Else, Then, When} from 'react-if';

//for route '/request/id'
const UserRequestPage = (props) => {
const dispatch = useDispatch()
  const [owner, setOnwer] = useState(null);
  const [arr, setArray] = useState(null);
  const [loading, setISloading] = useState(true);
//   useState(() => {

//     dispatch(getUserInfo())
//         .then(()=>{

//             setArray(props.info.userInfo.allRequest);
//         })

// }, []);

  useEffect(() => {
    if (arr !== null && arr !== undefined) {
      let request = arr.filter((val) => val._id === props.match.params.id);
      if (request.length > 0) setOnwer(true);
      else setOnwer(false);
    }else{
        dispatch(getUserInfo())
        .then(()=>{

            setArray(props.info.userInfo.allRequest);
        })
    }
    setISloading(false);
  }, [arr]);

  return (
    <>
      <When condition={owner !== null}>
        <If condition={owner && !loading}>
          <Then>
            <OwnerRequestDetails />
          </Then>
          <Else>
            <OtherRequestDetails />
          </Else>
        </If>
      </When>
      {/* <RequestSubmitters/> */}
    </>
  );
};

const mapStateToProps = (state) => ({
  info: state.userInfo,
});
const mapDispatchToProps = { getUserInfo };

export default connect(mapStateToProps, mapDispatchToProps)(UserRequestPage);

import React from 'react';
import '../resultCard/othersReqCard.css';
import Nav from '../navbar/navbar.jsx';
import { connect } from 'react-redux';
import { getOthersProfile } from '../../store/othersProfile/reducer';
import { useEffect } from 'react';

import ProfileBanner from './databanner.jsx';
import TopBanner from './topbanner.jsx';
import funkyground from '../../assets/funkyground.png';
import manwalks from '../../assets/manwalks.png';

const OthersProfile = (props) => {
  useEffect(() => {
    console.log('props.match.params.id====', props.match.params.id);
    props.getOthersProfile(props.match.params.id);
  }, []);
  const data = props.results.otherUserInfo;
  console.log('API DATA', data);

  return (
    <div>
      <style>{'body { background-color: #f2e8ff; }'}</style>

      <Nav />
      <TopBanner />
      <ProfileBanner data={data} userID={props.match.params.id}/>

      <img className="dayflow" alt="dayflow" src={funkyground} />
      <img className="man-walk" alt="dayflow" src={manwalks} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  results: state.othersProfile,
});

const mapDispatchToProps = { getOthersProfile };

export default connect(mapStateToProps, mapDispatchToProps)(OthersProfile);

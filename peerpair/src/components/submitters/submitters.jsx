import React from 'react';
import './submitterCard.css';
import { useEffect, useState } from 'react';
import cookie from 'react-cookies';
import { Button } from '@material-ui/core';
import { Icon } from '@iconify/react';
import person from '../../assets/person1.png';
import check from '@iconify-icons/uil/check';
import cross from '@iconify-icons/uil/times';
import messege from '@iconify-icons/uil/comment';
import { Link } from 'react-router-dom';
import { When,If,Else,Then } from 'react-if';
import Avatar from 'react-avatar';
const token = cookie.load('auth');
let dataResult = [];

const RequestSubmitters = (props) => {
  console.log(props.Provider, 'request');
  const [submitterInfo, setSubmitter] = useState([]);

  useEffect(() => {
    const getSubmitterInfo = async () => {
      const allDataInfo = await fetchSubmitter();
      setSubmitter(allDataInfo);
    };
    getSubmitterInfo();
  }, [props.Provider]);

  // Fetch Submitter Profile to render submitter info
  let results;
  const fetchSubmitter = async () => {
    let allData = [];
    for (let index = 0; index < props.Provider.submitters.length; index++) {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/profile/${props.Provider.submitters[index]}`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        }
      );
      const data = await res.json();
      console.log(data, 'get Submitter Info');
      allData.push(data);
    }
    return allData;
  };

  // })

  // Fetch Request Submitter to delete chosen submitter
  const fetchRequestSubmitter = async (e) => {
    console.log('click');
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/cancelsubmit/${props.Provider._id}`,
      {
        method: 'PUT',
        body: JSON.stringify({ id: e }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      }
    );
    let data = await res.json();
    console.log(data, 'delete Submitter');

    return data;
  };

  // Fetch Accepted Request to accept or cancel accept submitter
  const fetchAcceptedRequest = async (e) => {
    console.log('click');
    //for cancel accept submitter
    if (props.Provider.accepted) {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/cancelaccept/${props.Provider._id}`,
        {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        }
      );
      let data = await res.json();
      console.log(data, 'Cancel Accept Submitter');
      props.updateData(data);
      return data;
    }
    //for accept submitter
    else {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/accept/${props.Provider._id}`,
        {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
          body: JSON.stringify({ id: e }),
        }
      );
      let data = await res.json();
      console.log(data, 'Accept Submitter');
      props.updateData(data);

      return data;
    }
  };

  console.log(submitterInfo, 'subInfo');
  return (
    <>
      <When condition={submitterInfo.length === 0}>
        <h3>There is no submitters</h3>{' '}
      </When>
      {submitterInfo.map((submitter, idx) => {
        return (
          
          <div className="others-card2">
            <div className="user-part2">
            <Link to={'/profile/'+props.Provider.submitters[idx]}>
            
            <div className="user-data2">
                <If condition={submitter.profile_image}>
                  <Then>
                    <img
                      className="user-image2"
                      src={
                        'data:image/jpg;base64,' + submitter.profile_image
                      }
                      alt="user"
                    />
                  </Then>
                  <Else>
                    <Avatar
                      className="user-image2"
                      name={
                        submitter.first_name +
                        ' ' +
                        submitter.last_name
                      }
                      maxInitials={2}
                      size={75}
                    />
                  </Else>
                </If>
                <div className="user-text2">
                  <p>{submitter.first_name}</p>
                  <p>{submitter.location}</p>
                </div>
              </div>
              
            </Link>
<div className="user-icons2">
                <When condition={!props.accepted}>
                  <div className="user-icon2">
                    <Icon
                      icon={check}
                      onClick={() => {
                        fetchAcceptedRequest(props.Provider.submitters[idx]);
                      }}
                    />
                  </div>
                  <div className="user-icon2">
                    <Icon
                      icon={cross}
                      onClick={() => {
                        fetchRequestSubmitter(props.Provider.submitters[idx]);
                      }}
                    />
                  </div>
                </When>
                <div className="user-icon2">
                  <Link to={'/chat/' + props.Provider.submitters[idx]}>
                    <Icon icon={messege} />
                  </Link>
                </div>
              </div>
              <When condition={props.accepted}>
                <div style={{ marginTop: '40px' }}>
                  <Button
                    color="secondary"
                    onClick={() => {
                      fetchAcceptedRequest(props.Provider.submitters[idx]);
                    }}
                    variant="contained"
                  >
                    {' '}
                    RE-OPEN
                  </Button>
                </div>
              </When>
            </div>
          </div>
        );
        // return(
        // <li>
        // <h4>{submitter.first_name} {submitter.last_name}</h4>
        // <h6>{submitter.education}</h6>
        // <Button onClick={fetchAcceptedRequest} value={props.Provider.submitters[idx]}>{(props.Provider.accepted)?'Cancel':'Accept'}</Button>
        // {(props.Provider.accepted)? <Button disabled>Dismiss</Button> :
        // <Button onClick={fetchRequestSubmitter} value={props.Provider.submitters[idx]}> Dismiss</Button> }
        // </li>
        // )
      })}
    </>
  );
};

export default RequestSubmitters;

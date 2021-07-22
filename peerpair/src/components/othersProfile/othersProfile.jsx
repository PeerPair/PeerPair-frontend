import React from 'react';
import { connect } from 'react-redux';
import {getOthersProfile} from '../../store/othersProfile/reducer';
import { useEffect } from 'react'; 
import { Card, Button } from 'react-bootstrap';

const OthersProfile = (props)=>{
    useEffect(()=>{
        console.log('props.match.params.id====', props.match.params.id)
        props.getOthersProfile(props.match.params.id);
    }, []);
    const data = props.results.otherUserInfo;
    console.log('API DATA', data)
    return(
        <Card style={{ width: '18rem' }}>
  <Card.Img variant="top" src="holder.js/100px180" />
  <Card.Body>
    <Card.Title>{data.first_name} {data.last_name}</Card.Title>
    <Card.Subtitle className="mb-2 text-muted">
        {data.age}
    </Card.Subtitle>
    <Card.Text>
      {data.interests}
    </Card.Text>
    <Card.Text>
      {data.user_bio}
    </Card.Text>
    <Card.Text>
      {data.education}
    </Card.Text>
    <Card.Text>
      {data.peers}
    </Card.Text>
    <Button variant="primary">Send a Massage</Button>
  </Card.Body>
</Card>
    )
}

const mapStateToProps = state => ({
    results : state.othersProfile,
});

const mapDispatchToProps = {getOthersProfile};

export default connect(mapStateToProps, mapDispatchToProps)(OthersProfile);

import React, { useEffect, useState,useRef } from 'react';
import  {io}  from 'socket.io-client';
import cookie from 'react-cookies';
import { getUserInfo } from '../store/userInfo/action.js';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Modal } from '@material-ui/core';
import { useContext } from 'react';
import { When } from 'react-if';
import Video from './video.jsx';
import { VideoContext } from '../context/video.js';
import InputEmoji from "react-input-emoji";
import {Button} from 'react-bootstrap';
import '../design/reset.css';
import '../design/chat.css';

const socket = io(process.env.REACT_APP_API_URL);
const Chat = (props) => {
    const context = useContext(VideoContext);
    console.log(context);
  const [roomID, setID] = useState();
  const [messages, addMessage] = useState([]);
  const [oldMessages, addOldMessage] = useState([]);
  const [messageText, setMessage] = useState("");
  const [pageNum, addPage] = useState(1);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    socket.emit('join-room', roomID);

}, [roomID]);


useEffect(()=>{
  socket.on('chat-message', data => {
    addMessage([...messages,{senderID:data.senderID,message:data.message,senderName:data.senderName}]);
  });

},[messages, roomID])


socket.on('reciveCall',(b)=>{
  context.receive(b);
  
})


useEffect(() => {
    props.getUserInfo();
    const getID = async (id) => {
      try {
        let token = await cookie.load('auth');
        let data = await fetch(
           `${process.env.REACT_APP_API_URL}/messege/${id}`,
          {
            method: 'post',
            headers: new Headers({
              Authorization: 'bearer ' + token,
            }),
          }
        );
        let dataOBJ = await data.json();
        console.log(dataOBJ);
        setID(dataOBJ.msgRoom._id);
        addOldMessage(dataOBJ.oldMessages)
      } catch (e) {
        console.log(e);
      }
    };
    getID(props.roomID);
    
  }, [props.roomID]);

  const submitHandle = (e) => {
    e.preventDefault();
    console.log(e);

    e.target.reset();
    let messageObject = {
      senderName : props.info.userInfo.usertData.first_name,
      message:messageText,
      senderID:props.info.userInfo.usertData._id
      
    }
    addMessage([...messages,messageObject]);
    socket.emit('send-chat-message', roomID, messageObject);
  };


const loadMore = async()=>{
    try {
      addPage(pageNum+1);
      let token = await cookie.load('auth');
      let data = await fetch(
         `${process.env.REACT_APP_API_URL}/old/${roomID}`,
        {
          method: 'post',
          headers: new Headers({
            'Authorization': 'bearer '+token,
            'Content-Type': 'application/json'
          }),
          body: JSON.stringify({page:pageNum}) 
        }
      );
      let dataOBJ = await data.json();
      dataOBJ.reverse();
      console.log(dataOBJ);
      addOldMessage([...dataOBJ,...oldMessages])
    } catch (e) {
      console.log(e);
    }
  };



const enterHandle=()=>{
  let messageObject = {
    senderName : props.info.userInfo.usertData.first_name,
    message:messageText,
    senderID:props.info.userInfo.usertData._id
    
  }
  addMessage([...messages,messageObject]);
  socket.emit('send-chat-message', roomID, messageObject);
}
  
  return (
    <>

    <main class="main">
    <header>
      <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_01.jpg" alt=""/>
			<div>
				<h2>Chat with Vincent Porter</h2>
				<h3>already 1902 messages</h3>
			</div>
    </header>
    <Button  onClick={loadMore}>see old message</Button>
    <div>
    <ul id="chat">
        {oldMessages.map((val,idx)=> 
        <li class="you">
          <div class="entete">
					<span class="status green"></span>
					<h2>{val.sender_name}</h2>
				  </div>
				  <div class="triangle"></div>
				  <div class="message">{val.messege}</div>
          {/* <div key={idx}><div><b>{val.sender_name}</b></div> {val.messege} </div> */}
        </li>)}
        {messages.map((val,idx)=> 
        <li class="me">
          <div class="entete">
					<span class="status blue"></span>
					<h2>{val.senderName}</h2>
				  </div>
				  <div class="triangle"></div>
				  <div class="message">{val.message}</div>
          {/* <div key={idx}><div><b>{val.senderName}</b></div> {val.message} </div> */}
        </li>)}
        
    </ul>
    </div>
      <div id="message-container" class="msgContainer"></div>
      <div class="footerIcon">
      <form  onSubmit={submitHandle}>
        <InputEmoji class="textarea"      value={messageText}
      onChange={setMessage}
      cleanOnEnter
      onEnter={enterHandle}
      placeholder="Type your message" />
        <Button type="submit">Send</Button>
      </form>
      <Link to={`/video/${roomID}`} target='_blank' ><Button>{(context.receiveCall)?'Join':'Call'}</Button></Link>
      </div>
    </main>
    </>
  );
};

const mapStateToProps = state => ({
  info: state.userInfo,
})
const mapDispatchToProps = { getUserInfo };

export default connect(mapStateToProps, mapDispatchToProps)(Chat);


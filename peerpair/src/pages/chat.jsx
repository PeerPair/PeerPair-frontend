import React, { useEffect, useState,useRef } from 'react';
import  {io}  from 'socket.io-client';
import cookie from 'react-cookies';
import { getUserInfo } from '../store/userInfo/action.js';
import { connect } from 'react-redux';
const Chat = (props) => {

    const socketUrl = process.env.REACT_APP_API_URL;
    let socket = useRef(null);
  const [roomID, setID] = useState();
  const [messages, addMessage] = useState([]);
  const [oldMessages, addOldMessage] = useState([]);
  const [pageNum, addPage] = useState(1);
  useEffect(() => {
    socket.current = io(socketUrl);
    console.log(roomID);
    socket.current.emit('join-room', roomID);
    socket.current.on('chat-message', data => {
      addMessage([...messages,`${data.name}: ${data.message}`]);
    });
    // socket.connect();
}, [socketUrl,roomID]);




// useEffect(()=>{


// },[messages])







useEffect(() => {

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
    getID(props.match.params.id);
    props.getUserInfo();
  }, []);

  const submitHandle = (e) => {
    console.log(props.info)
    e.preventDefault();
    console.log(e);
    const message = e.target.message.value;
    e.target.reset();
    let messageObject = {
      senderName : props.info.first_name,
      
    }
    addMessage([...messages,`${props.info.first_name}: ${message}`]);
    socket.current.emit('send-chat-message', roomID, message);
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



  
  return (
    <>
    <button onClick={loadMore}>see old message</button>
    <div>
        {oldMessages.map((val,idx)=> <div key={idx}> {val.messege} </div>)}
        {messages.map((val,idx)=> <div key={idx}> {val} </div>)}

    </div>
      <div id="message-container" class="msgContainer"></div>
      <form onSubmit={submitHandle}>
        <input type="text" name="message" />
        <button type="submit">Send</button>
      </form>
    </>
  );
};

const mapStateToProps = state => ({
  info: state.userInfo,
})
const mapDispatchToProps = { getUserInfo };

export default connect(mapStateToProps, mapDispatchToProps)(Chat);


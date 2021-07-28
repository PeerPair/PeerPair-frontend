import React from 'react';
import '../design/chatList&chatMsg.css';
import Chatlist from './chatlist.jsx';
import Chat from './chat.jsx';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { propTypes } from 'react-bootstrap/esm/Image';
import { useState } from 'react';
import { useEffect } from 'react';

const ChatListWithChatMsg = (props) => {
    const [roomID, setID] = useState(props.match.params.id);

    useEffect(()=>{
        setID(props.match.params.id)
    },[props.match.params.id])
        return ( 
            <>

<div className="main">
     <Chatlist/>
     <Chat roomID={roomID}/>
</div>
 </>
        )
}

export default ChatListWithChatMsg ;
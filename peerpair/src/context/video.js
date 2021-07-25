import React from 'react';

import { useState } from 'react';
import { useEffect } from 'react';



export const VideoContext = React.createContext();


function LoginProvider(props){

  const [receiveCall, setReceiveCall]= useState(false);
 
const receive = b =>{
    setReceiveCall(b);
}

 
const state = {receiveCall, receive}
    return (
      <VideoContext.Provider value={state}>
        {props.children}
      </VideoContext.Provider>
    );
}

export default LoginProvider;



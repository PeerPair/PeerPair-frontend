import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";
import TopBanner from '../../src/components/video/topBanner.jsx';
// import ResultsBanner from '../../src/components/searchResultRequest/searchResultRequest.jsx';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import MicIcon from '@material-ui/icons/Mic';
import VideocamIcon from '@material-ui/icons/Videocam';
import '../design/video.css';



const Container = styled.div`
    padding: 20px;
    display: flex;
    height: 100vh;
    width: 90%;
    margin: auto;
    flex-wrap: wrap;
`;

const StyledVideo = styled.video`
    height: 40%;
    width: 50%;
`;

const Video = (props) => {
    const ref = useRef();

    useEffect(() => {
        props.peer.on("stream", stream => {
            ref.current.srcObject = stream;
        })
    }, []);

    return (
        <StyledVideo playsInline autoPlay ref={ref} />
    );
}


const videoConstraints = {
    height: window.innerHeight / 2,
    width: window.innerWidth / 2
};

const Room = (props) => {
    const [peers, setPeers] = useState([]);
    const socketRef = useRef();
    const userVideo = useRef();
    const peersRef = useRef([]);
    const roomID = props.match.params.roomID;

    useEffect(() => {
        socketRef.current = io.connect(process.env.REACT_APP_API_URL);
        navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: true }).then(stream => {
            userVideo.current.srcObject = stream;
            socketRef.current.emit("join room", roomID);
            socketRef.current.on("all users", users => {
                const peers = [];
                users.forEach(userID => {
                    const peer = createPeer(userID, socketRef.current.id, stream);
                    peersRef.current.push({
                        peerID: userID,
                        peer,
                    })
                    peers.push(peer);
                })
                setPeers(peers);
            })

            socketRef.current.on("user joined", payload => {
                const peer = addPeer(payload.signal, payload.callerID, stream);
                peersRef.current.push({
                    peerID: payload.callerID,
                    peer,
                })

                setPeers(users => [...users, peer]);
            });

            socketRef.current.on("receiving returned signal", payload => {
                const item = peersRef.current.find(p => p.peerID === payload.id);
                item.peer.signal(payload.signal);
            });
        })
    }, []);
	const mute=()=>{
		const enabled = userVideo.current.srcObject.getAudioTracks()[0].enabled;
		if (enabled) {
		  userVideo.current.srcObject.getAudioTracks()[0].enabled = false;
		} else {
		  userVideo.current.srcObject.getAudioTracks()[0].enabled = true;
		}
	}
	const playStop = () => {
		let enabled = userVideo.current.srcObject.getVideoTracks()[0].enabled;
		if (enabled) {
		  userVideo.current.srcObject.getVideoTracks()[0].enabled = false;
		} else {
		  userVideo.current.srcObject.getVideoTracks()[0].enabled = true;
		}
	  };
    function createPeer(userToSignal, callerID, stream) {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream,
        });

        peer.on("signal", signal => {
            socketRef.current.emit("sending signal", { userToSignal, callerID, signal })
        })

        return peer;
    }

    function addPeer(incomingSignal, callerID, stream) {
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream,
        })

        peer.on("signal", signal => {
            socketRef.current.emit("returning signal", { signal, callerID })
        })

        peer.signal(incomingSignal);

        return peer;
    }

    const useStyles = makeStyles((theme) => ({
        button: {
          textShadow: "2px 1px 3px rgba(24, 24, 24, 0.39)",
          color:"white",
          width:"11.8em",
          height:"4em",
          marginLeft:"1em",
          backgroundColor:"rgba(90, 214, 224,.7)",
        },
      }));
      const classes = useStyles();

    return (
        <>
        <style>{'body { background-color: #EDE3FA; }'}</style>
        <TopBanner/>
        <div className="video-chatContainer">
           <div className="videoChat">
            <StyledVideo muted ref={userVideo} autoPlay playsInline />
            {peers.map((peer, index) => {
                return (
                    <Video key={index} peer={peer} />
                );
            })}
            </div>
            <div className="videoChat-btn">
			<Button 
            variant="contained"
            className={`${classes.button} + newbtn`}
            startIcon={<MicIcon />}
            onClick={mute}>mute</Button>

			<Button 
            variant="contained"
            className={`${classes.button} + newbtn`}
            startIcon={<VideocamIcon />}
            onClick={playStop}>camera</Button>
            </div>
        </div>
            </>
    );
};

export default Room;

import superagent from 'superagent';
import cookie from 'react-cookies';

const API=process.env.REACT_APP_API_URL;

let initialState ={
    newMessages : [],
    all:[]
    
}

const notificationReducer = (state = initialState, action)=>{
    let {type, payload} = action;
    switch(type){
        case 'GET': 
        return{
            notification: payload,
        };
        default :
        return state;
    }
}

export const getNotifications = () => async(dispatch, state)=>{
    try{
        const token = cookie.load('auth');
        const response = await superagent.get(`${API}/myNotification/`).set({'Authorization' : 'Bearer '+ token})
        console.log('THE RESPONSE IS' , response);
        await dispatch(getNotification(response.body))
    } catch(error){
                console.log('Failed To Get Data', error.message)
            }
}
export const getNotification = (notification) =>{
    return{
        type : 'GET',
        payload : notification,
    }
}

export default notificationReducer;


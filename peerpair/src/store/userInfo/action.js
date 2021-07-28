import superagent from 'superagent';
import cookie from 'react-cookies';
const API = process.env.REACT_APP_API_URL;

export const getUserInfo = ()=> (dispatch,state)=>{
    const token = cookie.load('auth');
    return superagent.get(API).set({'Authorization': 'Bearer ' + token})
    .then(res=>{
        dispatch(getUserInfoAction(res.body));
    })
}

//Action for get userInfo :
export const getUserInfoAction = payload => {
    return {
        type: 'get',
        payload: payload,
    }
}
import superagent from 'superagent';
import cookie from 'react-cookies';

const API=process.env.REACT_APP_API_URL;

let initialState ={
    otherUserInfo : {
        id : '',
        first_name: '',
        last_name : '',
        age: '',
        user_bio: '',
        education:'',
        interests: '',
    },
    active : null,
}

const otherUsersReducer = (state = initialState, action)=>{
    let {type, payload} = action;
    switch(type){
        case 'GET': 
        return{
            otherUserInfo: payload,
            active : true,
        };
        default :
        return state;
    }
}

export const getOthersProfile = (id) => async(dispatch, state)=>{
    try{
        const token = cookie.load('auth');
        const response = await superagent.get(`${API}/profile/${id}`).set({'Authorization' : 'Bearer '+ token});
        console.log('THE RESPONSE IS' , response);
        await dispatch(getOthersData(response.body))
    } catch(error){
                console.log('Failed To Get Data', error.message)
            }
}
export const getOthersData = (user) =>{
    return{
        type : 'GET',
        payload : user,
    }
}

export default otherUsersReducer;


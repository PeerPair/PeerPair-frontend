//create store 
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import userInfoReducer from './userInfo/reducer.js';
import thunk from 'redux-thunk';
import otherUsersReducer from './othersProfile/reducer'
import notificationReducer from './notification/reducer'
//combine reducer
let reducers = combineReducers({ userInfo: userInfoReducer, othersProfile: otherUsersReducer, notificationReducer:notificationReducer });


//create store
const store = () => {
    return createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));
}

export default store();
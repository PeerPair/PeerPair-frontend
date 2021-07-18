//create store 
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import userInfoReducer from './userInfo/reducer.js';
import thunk from 'redux-thunk';

//combine reducer
let reducers = combineReducers({ userInfo: userInfoReducer });


//create store
const store = () => {
    return createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));
}

export default store();
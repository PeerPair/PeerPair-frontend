//Initial state
let initialState = {
    userInfo: {},
    active: null,
}


//userInfo Reducer
const userInfoReducer = (state = initialState, action) => {
    let {type, payload} = action;

    switch (type) {
        case 'get':
              return {
                userInfo: payload,
                active: true,
              };    
            
        default:
            return state;
    }
}

export default userInfoReducer;


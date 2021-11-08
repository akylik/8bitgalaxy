export default (state, action) => {
  switch (action.type) {
    case 'IS_LOGIN':
      // console.log('IS_LOGIN - state', state)
      // if(!state.isFirstPlayer) {
        return {
          ...state,
          isLogin: true,
          roomId: action.payload.roomId,
          userName: action.payload.userName,
          // isFirstPlayer: action.payload.userName,
        };
      // } else {
      //   return {
      //     ...state,
      //     isLogin: true,
      //     roomId: action.payload.roomId,
      //     userName: action.payload.userName,
      //     isSecondPlayer: action.payload.userName,
      //   };
      // }
    case 'SET_USERS':
      return {
        ...state,
        users: action.payload,
      };
    // case 'SET_ACTIVE_PLAYER':
    //   // console.log('SET_ACTIVE_PLAYER - action.payload', action.payload)
    //   // console.log('SET_ACTIVE_PLAYER - state', state)
    //   return {
    //     ...state,
    //     isActiveToMove: action.payload,
    //   };
    case 'SET_USER_ACTIVE':
      // console.log('SET_USER_ACTIVE - action.payload', action.payload)
      // console.log('SET_USER_ACTIVE - state', state)
      return {
        ...state,
        activeUsers: action.payload,
      };
    case 'SET_FIRST_USER':
        return !state.FirstPlayer ? {...state, FirstPlayer: action.payload, isActiveToMove: false} : {...state, FirstPlayer: action.payload,isActiveToMove: true};
    // case 'SET_SECOND_USER':
    //     return  state.FirstPlayer ? {...state, SecondPlayer: action.payload} : {...state}

    default:
      return state;
  }
}
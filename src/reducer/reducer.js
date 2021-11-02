export default (state, action) => {
  switch (action.type) {
    case 'IS_LOGIN':
      console.log(state)
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
    case 'SET_ACTIVE_PLAYER':
      return {
        ...state,
        isActiveToMove: action.payload,
      };
    case 'SET_FIRST_USER':
        // return {
        //   ...state,
        //   FirstPlayer: action.payload,
        //   isActiveToMove: true,
        // };
        return !state.FirstPlayer ? {...state, FirstPlayer: action.payload, isActiveToMove: false} : {...state, FirstPlayer: action.payload,isActiveToMove: true};

    default:
      return state;
  }
}
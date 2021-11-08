import "./styles/8bitfont.css";
import React, { useReducer, useEffect } from "react";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";
import {observer} from "mobx-react-lite";
import axios from "axios";

import Demo from "./Demo";
import GameView from "./components/ui/GameView";
import socket from "./server/socket";
import RoomView from "./components/ui/RoomView";
import reducer from "./reducer/reducer";
import GameViewFull from "./components/ui/GameViewFull";

const App = () => {
  const [state, dispatch] = useReducer(reducer, {
    isLogin: false,
    roomId: null,
    userName: null,
    users: [],
    FirstPlayer: null,
    SecondPlayer: null,
    isActiveToMove: false,
    activeUsers: null,
  });

  const onLogin = async (obj) => {
    dispatch({
      type: "IS_LOGIN",
      payload: obj,
    });
    socket.emit("ROOM:LOGIN", obj);
    const {data} = await axios.get(`/${obj.roomId}`);
    setUsers(data.users);
    setFirstUser(data.firstPlayer);
    // setSecondUser(data.secondPlayer);
    setUserActive(data.isUserActive);
  };

  const setUsers = (users) => {
    dispatch({
      type: "SET_USERS",
      payload: users,
    });
  };

  const setFirstUser = (user) => {
    dispatch({
      type: "SET_FIRST_USER",
      payload: user,
    });
  };
  // const setSecondUser = (user) => {
  //   dispatch({
  //     type: "SET_SECOND_USER",
  //     payload: user,
  //   });
  // };
  const setUserActive = (users) => {
    dispatch({
      type: "SET_USER_ACTIVE",
      payload: users,
    });
  };

  useEffect(() => {
    socket.on("ROOM:SET_USERS", setUsers);
    socket.on("ROOM:SET_FIRST_USER", setFirstUser);
    // socket.on("ROOM:SET_SECOND_USER", setSecondUser);
    socket.on("ROOM:SET_USER_ACTIVE", setUserActive);
  }, []);

    
  const game = (new Demo()).game;

  return (
    <div className="App" >
      {/* <DndProvider debugMode={true} backend={HTML5Backend}>
        <GameView game={game}/>
      </DndProvider> */}
      {!state.isLogin ? <RoomView onLogin={onLogin}/> : <GameViewFull game={game} state={state} />}
    </div>
  );
};

export default observer(App);

// import PileView from "./components/ui/PileView";
// import CardView from "./components/ui/CardView";
// import Pile from "./sotres/Pile";
// import Card from "./sotres/Card";

// const pile1 = Pile.create().assert("Discard");
// pile1.put("Human-Ship-2c");
// pile1.put("Human-Base-3s");
// pile1.put("Human-Colony-4p");
// pile1.put("Human-Tech-5c");

// const pile2 = Pile.create().assert("Discard", "LeftToRight");
// pile2.put("Human-Ship-2c");
// pile2.put("Human-Base-3s");
// pile2.put("Human-Colony-4p");
// pile2.put("Human-Tech-5c");

// const pile3 = Pile.create().assert("Discard LeftToRight");
// const card = Card.create({card: "Human-Tech-5c"});
// const card = Card.create().assert("Human-Tech-5c");


//
// <PileView store={pile1} y={1} x={1}/>
// <PileView store={pile2} y={1} x={10}/>
// <PileView pile={pile3} y={6} x={10}>
//   <CardView card={Card.create().assert("Human-Tech-5c")} y={1} x={1}/>
// </PileView>
//
// {game.draw(v, Card.assert("Human-Ship-2c"), 0, 8)}
// {game.draw(v, Card.assert("Human-Base-3s"), 0, 8 * 2)}
// {game.draw(v, Card.assert("Human-Colony-4p"), 0, 8 * 3)}
// {game.draw(v, Card.assert("Human-Tech-5c"), 0, 8 * 4)}
//
// {game.draw(h, Card.assert("Human-Ship-2c"), 0, 8)}
// {game.draw(h, Card.assert("Human-Base-3s"), 0, 8 * 2)}
// {game.draw(h, Card.assert("Human-Colony-4p"), 0, 8 * 3)}
// {game.draw(h, Card.assert("Human-Tech-5c"), 0, 8 * 4)}

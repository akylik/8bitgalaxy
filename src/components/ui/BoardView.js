import React, { useState, useReducer, useEffect } from "react";
import { observer } from "mobx-react-lite";
import HomeView from "./HomeView";
import FieldView from "./FieldView";

import reducer from "../../reducer/reducer";
import socket from "../../server/socket";

const BoardView = ({ board, props }) => {
  // const [state, dispatch] = useReducer(reducer, {
  //   // isLogin: false,
  //   // roomId: null,
  //   userName: state.userName,
  //   users: state,
  //   // FirstPlayer: null,
  //   // SecondPlayer: null,
  //   isActiveToMove: state.isActiveToMove,
  // });
  
  const roomId = props.roomId;
  let curYPos, curXPos, curDown;

  const mouseMove = function (e) {
    if (curDown) {
      if (curXPos && curYPos) {
        window.scrollBy(curXPos - e.clientX, curYPos - e.clientY);
      }
      curXPos = e.clientX;
      curYPos = e.clientY;
    }
  };

  const mouseDown = function (e) {
    if (
      e.target.classList.value.includes("Specs") ||
      e.target.classList.value.includes("Card") ||
      e.target.classList.value.includes("Value")
    ) {
      return;
    }

    curYPos = e.clientY;
    curXPos = e.clientX;
    curDown = true;
  };

  const mouseUp = function (e) {
    curDown = false;
  };

  const changeActivePlayer = (roomId) => {
    const plauers = props.activeUsers;
    let res = [];

    let obj = Object.fromEntries(plauers);
    
    for( let it in obj ) {
      res.push(!obj[it]);
    }
    const param = Object.keys(obj);
    const bla = Object.assign(...param.map((v, i) => ({[v]: res[i]})));
    let map = new Map(Object.entries(bla));

    socket.emit("ROOM:CHANGE_ACTIVE_USER", {roomId,bla});
  };

  const handleClick = function () {
    console.log("CLICK");
    changeActivePlayer(roomId);
  };

  return (
    <div
      className={"Board"}
      onMouseDown={mouseDown}
      onMouseUp={mouseUp}
      onMouseMove={mouseMove}
      onClick={handleClick}
    >
      <HomeView home={board.home(1)} y={31} x={29} />
      <HomeView home={board.home(2)} y={30} x={46} />
      <FieldView field={board.field} y={8} x={15} />
    </div>
  );
};

export default observer(BoardView);

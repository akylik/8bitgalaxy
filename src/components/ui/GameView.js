import React from "react";
import { observer } from "mobx-react-lite"
import BoardView from "./BoardView";

// const GameView = ({game}) => {
//   return (
//     <div className="Game">
//       <BoardView board={game.board}/>
//     </div>
//   );
// };

const GameView = ({game, state}) => {
  console.log('state GameView',state);
  return (
    <div>
      {((!state.isActiveToMove && state.users.length < 2) || (state.activeUsers?.length < 2)) && (<h2>Waiting for other player!</h2>)}
      <br/>
      <b>RoomID: {state.roomId}</b>
      <br/>
      <b>User Name: {state.userName}</b>
      <br/>
      <b>Can play: {state.isActiveToMove ? "Yes" : "No"}</b>
      <br/>
      <b>Online {state.users.length} users</b>
      <ul>
        {state.users.map((name, index) => <li key={name+index}>{name}</li>)}
      </ul>
      {!state.isActiveToMove && (<div className="notDrag"></div>)}
      <div className="Game">
        <BoardView board={game.board} props={state}/>
      </div>
    </div>
  );
};

export default observer(GameView);

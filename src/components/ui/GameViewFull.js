import React from "react";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import { observer } from "mobx-react-lite";

import GameView from "./GameView";

const GameViewFull = ({game, state}) => {
  return (
    <div>
       <DndProvider debugMode={true} backend={HTML5Backend}>
        <GameView game={game} state={state}/>
      </DndProvider>
    </div>
  );
};

export default observer(GameViewFull);

import React from "react";
import StarView from "./StarView";
import usePosition from "../../state/hooks/usePosition";
import {observer} from "mobx-react-lite";

const FieldView = ({field, y, x, state}) => {
  const [p] = usePosition(y, x);

  return (
    <div className={"Field"} style={{left: p.x + "px", top: p.y + "px"}}>
      <StarView star={field.star(0, 0)} state={state}/>
      <StarView star={field.star(0, 1)} state={state}/>
      <StarView star={field.star(1, 0)} state={state}/>
      <StarView star={field.star(1, 1)} state={state}/>
      <StarView star={field.star(1, 2)} state={state}/>
      <StarView star={field.star(2, 0)} state={state}/>
      <StarView star={field.star(2, 1)} state={state}/>
    </div>
  );
};

export default observer(FieldView);

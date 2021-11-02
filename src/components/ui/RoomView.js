import React, { useState } from "react";
import axios from "axios";

const RoomView = ({onLogin}) => {
  const [roomId, setRoomId] = useState('');
  const [userName, setuserName] = useState('');
  
  const onEnter = () => {
    if (!roomId || !userName) {
      return alert("Неверные данные!");
    }
    const obj = {
      roomId,
      userName,
    }
    axios.post("/", obj).then(onLogin(obj));
  }

  return (
    <div className="room-wrapper">
      <div className="room-block">
        <input type="text" className="room-input" placeholder="Room ID" value={roomId} onChange={e => setRoomId(e.target.value)}/>
        <input type="text" className="room-input" placeholder="Ваше имя" value={userName} onChange={e => setuserName(e.target.value)}/>
        <button className="room-button" onClick={onEnter}>ВОЙТИ</button>
      </div>
    </div>
  );
};

export default RoomView;
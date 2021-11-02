import io from "socket.io-client";

const socket = io();
// const socket = io('http://localhost:8080/',{transports: ['websocket']});
// const socket = io('http://localhost:8080/');



export default socket;

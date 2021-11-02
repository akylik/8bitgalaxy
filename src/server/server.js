const express = require("express");
const expressStatusMonitor = require('express-status-monitor');

const app = express();
// const server = require('http').createServer(app);
const server = require('http').Server(app);
const io = require('socket.io')(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  },
  // cors: {
  //   origin: "http://localhost:3000",
  //   methods: ["GET", "POST"],
  //   credentials: true
  // }
});

// app.use(expressStatusMonitor({
//   websocket: io,
//   port: app.get(8080)
// }));

app.use(express.json());

const rooms = new Map();

app.get("/:id", (req, res) => {
  const { id: roomId } = req.params;
  const obj = rooms.has(roomId)
    ? { users: [...rooms.get(roomId).get("users").values()], firstPlayer: rooms.get(roomId).get("firstPlayer")}
    : { users: [] };
  res.json(obj);
});

app.post('/', (req, res) => {
  const { roomId, userName } = req.body;
  if(!rooms.has(roomId)) {
    rooms.set(
      roomId,
      new Map([
        ["users", new Map()],
        ["firstPlayer", userName],
        ["isUserActive", new Map([[userName, true]])],
      ]),
    );
  } 
});

io.on('connection', (socket) => {
  socket.on("ROOM:LOGIN", ({roomId, userName}) => {
    // console.log("socket.id:",socket.id, {roomId, userName});
    socket.join(roomId);
    rooms.get(roomId).get("users").set(socket.id, userName);
    // rooms.get(roomId).get("isUserActive").key[0];

    ////////////
    rooms.get(roomId).get("isUserActive").forEach((userName, value) => {
      rooms.get(roomId).get("isUserActive").set(value, true);
      console.log('userName, value', userName, value)
    })

    rooms.get(roomId).get("isUserActive").set(userName, false);
    
    // console.log(rooms);
    const users = [...rooms.get(roomId).get("users").values()];

    const firstPlayer = rooms.get(roomId).get("firstPlayer");
    // console.log("firstUser:",firstPlayer);

    const activeUsers = [...rooms.get(roomId).get("isUserActive")];
    console.log('activeUsers',activeUsers);

    socket.broadcast.to(roomId).emit("ROOM:SET_USERS", users);
    socket.broadcast.to(roomId).emit("ROOM:SET_FIRST_USER", firstPlayer);

    // console.log("active: ", rooms.get(roomId).get("isUserActive"))
    // console.log("active: ", rooms.get(roomId).get("isUserActive").entries())

    ///////////
    socket.broadcast.to(roomId).emit("ROOM:SET_ACTIVE_USERS", activeUsers);

    // socket.to(roomID).emit("ROOM:SET_USERS", users);

    // socket.broadcast.to(roomID).emit("ROOM:LOGED", users);
    // socket.to(roomID).emit("ROOM:LOGED", users);
    // socket.to(roomID).broadcast.emit("ROOM:LOGED", users);
  });
  socket.on("disconnect", () => {
    rooms.forEach((value, roomId) => {
      if(value.get("users").delete(socket.id)) {
        const users = [...value.get("users").values()];
        socket.broadcast.to(roomId).emit("ROOM:SET_USERS", users);
      }
    });
  });

  console.log('user connected', socket.id);
});

server.listen(8080, (err) => {
  if(err) throw err;
  console.log('Сервер запущен!');
});

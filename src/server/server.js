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
    ? { users: [...rooms.get(roomId).get("users").values()], 
                firstPlayer: rooms.get(roomId).get("firstPlayer"), 
                // secondPlayer: rooms.get(roomId).get("secondPlayer"), 
                isUserActive: [...rooms.get(roomId).get("isUserActive")]
      }
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
        // ["secondPlayer", null],
        ["isUserActive", new Map([[userName, true]])],
      ]),
    );
  } 
});

io.on('connection', (socket) => {
  socket.on("ROOM:LOGIN", ({roomId, userName}) => {
    socket.join(roomId);
    rooms.get(roomId).get("users").set(socket.id, userName);
    ////////////
    rooms.get(roomId).get("isUserActive").forEach((userName, value) => {
      rooms.get(roomId).get("isUserActive").set(value, true);
    });

    rooms.get(roomId).get("isUserActive").set(userName, false);
    
    const users = [...rooms.get(roomId).get("users").values()];
    const firstPlayer = rooms.get(roomId).get("firstPlayer");
    // const secondPlayer = rooms.get(roomId).get("secondPlayer");

    const activeUsers = [...rooms.get(roomId).get("isUserActive")];
    console.log('activeUsers',activeUsers);

    socket.broadcast.to(roomId).emit("ROOM:SET_USERS", users);
    socket.broadcast.to(roomId).emit("ROOM:SET_FIRST_USER", firstPlayer);
    // socket.broadcast.to(roomId).emit("ROOM:SET_SECOND_USER", secondPlayer);
    socket.broadcast.to(roomId).emit("ROOM:SET_USER_ACTIVE", activeUsers);
    // console.log('isUserActive', rooms.get(roomId).get('isUserActive'));
    ///////////
    // socket.broadcast.to(roomId).emit("ROOM:SET_ACTIVE_USERS", activeUsers);
    // socket.to(roomID).emit("ROOM:SET_USERS", users);
    // socket.broadcast.to(roomID).emit("ROOM:LOGED", users);
    // socket.to(roomID).emit("ROOM:LOGED", users);
    // socket.to(roomID).broadcast.emit("ROOM:LOGED", users);
  });
  socket.on('ROOM:CHANGE_ACTIVE_USER', ({roomId,bla}) => {
    // console.log('rooms',rooms.keys())
    
    let obj = new Map(Object.entries(bla));
    // console.log('obj',obj);
    console.log('obj',obj);
    console.log('roomId',roomId);

    rooms.get(roomId).set('isUserActive', obj);
    const activeUsers = [...rooms.get(roomId).get("isUserActive")];
    console.log('activeUsers',activeUsers);

    socket.broadcast.to(roomId).emit("ROOM:SET_USER_ACTIVE", activeUsers);
  })
  socket.on("disconnect", () => {
    rooms.forEach((value, roomId, userName) => {
      // console.log('disconnect value ',value);
      // console.log('disconnect userName', userName);
      // console.log('value',value.get('isUserActive'));
      // console.log('value',value.get('users').get(socket.id));
      // console.log('value',value.get("isUserActive"));
      // console.log('userName', userName.get(roomId).get('users').get(socket.id));
      // const deleteUser = userName.get(roomId).get('users').get(socket.id);
      const deleteUser = value.get('users').get(socket.id);

      if(value.get("users").delete(socket.id)) {
        const users = [...value.get("users").values()];
        socket.broadcast.to(roomId).emit("ROOM:SET_USERS", users);
      };
      if(value.get("isUserActive").delete(deleteUser)) {
        const activeUsers =[...value.get('isUserActive')];
        // const activeUsers = [...rooms.get(roomId).get("isUserActive")];
        // const activeUsers = [...value.get("isUserActive").values()];
        socket.broadcast.to(roomId).emit("ROOM:SET_USER_ACTIVE", activeUsers);
        console.log('disconnect value',value);
      }
    });
  });
  console.log('user connected', socket.id);
});

server.listen(8080, (err) => {
  if(err) throw err;
  console.log('Сервер запущен!');
});

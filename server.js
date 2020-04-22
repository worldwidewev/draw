// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

// our default array of dreams
const dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
];

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("draw"));
//app.use('/static', express.static('draw'));

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

app.get("/presenter.html", (request, response) => {
  response.sendFile(__dirname + "/views/presenter.html");
});


// IMPORTANT STUFF

io.on('connection', (socket) => {
  console.log('a user connected');
});

const draw = io.of('/draw');
draw.on('connection', (socket) => {
  socket.on('drawing', (msg) => {
    present.emit('drawing', socket.id, msg)
  })
})

// END IMPORTANT STUFF

const present = io.of('/present');

// listen for requests :)
const listener = http.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

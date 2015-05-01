var osc = require('node-osc'),
    io = require('socket.io').listen(8082);

var oscServer, oscClient;

io.sockets.on('connection', function (socket) {
  socket.on("config", function (obj) {
    oscServer = new osc.Server(obj.server.port, obj.server.host);
    oscClient = new osc.Client(obj.client.host, obj.client.port);

    oscClient.send('/status', socket.sessionId + ' connected');

    oscServer.on('message', function(msg, rinfo) {
      console.log(msg, rinfo);
      socket.emit("message", msg);
    });
  });
  socket.on("message", function (obj) {
    oscClient.send(obj.address,obj.arg);
  });
  socket.on("disconnect", function () {
    console.log("Client Disconnected");
    oscServer.kill();
  });
});

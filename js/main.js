socket = io.connect('http://127.0.0.1', { port: 8082, rememberTransport: false});
socket.on('connect', function() {
    // sends to socket.io server the host/port of oscServer and oscClient
    socket.emit('config',
        {
            // where should we listen for messages for browser consumption?
            server: {
                port: 3334,
                host: '127.0.0.1'
            },
            // where should we send messages from the browser?
            client: {
                port: 4000,
                host: '127.0.0.1'
            }
        }
    );
});

socket.on('message', function(message) {
  var addr = message[0];
  var args = message.splice(1);
  switch (addr) {
  case "/position":
    updatePosition.apply(this, args)
    break;
  case "/log":
    console.log("Log:", args);
  default:
    console.error("Invalid OSC address", message);
  }
});

var updatePosition = function (x, y) {
  console.log("updatePosition", x, y);
  var newq = [x, y];
  var oldq = $('#pacman').offset();
  var speed = calcSpeed([oldq.top, oldq.left], newq);
  $('#pacman').animate({ top: newq[0], left: newq[1] }, speed, function() {
  });  
};

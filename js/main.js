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
  case "/direction":
    updateDirection.apply(this, args)
    break;
  case "/thrust":
    updateThrust.apply(this, args)
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
  var oldq = $('#position-indicator').offset();
  $('#position-indicator').animate({ top: newq[0], left: newq[1] });
};

var updateDirection = function (pitch, roll) {
  var scale = 125;
  var newX, newY;
  console.log("updateDirection", pitch, roll);

  if (pitch > 0 && false) {
    newY = (1-pitch) * scale;
  } else {
    newY = scale + (-1 * pitch * scale);
  }

  if (roll > 0 && false) {
    newX = (1-roll) * scale;
  } else {
    newX = scale + (roll * scale);
  }

  // Subtract half the width/height of the indicator
  var newq = [newY + 4, newX - 4];
  var oldq = $('#direction-indicator').offset();
  $('#direction-indicator').animate({ top: newq[0], left: newq[1] });
};

var updateThrust = function (percent) {
  $("#thrust-meter").width(percent + "%");
};

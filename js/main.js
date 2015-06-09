var astro_saved = 0

function update_astro(astro){
    $("#astro-level").empty();
    for(var i = 0; i<astro; i++){
        console.log(i);
     $("#astro-level").append("<i class='icons8-Astronaut-Filled'></i>");
    }
    for(var i = astro; i<4; i++){
        console.log(i);
     $("#astro-level").append("<i class='icons8-Astronaut'></i>");
    }
}
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

window.astros = {};

socket.on('message', function(message) {
   var addr = message[0].substr(4);
   var args = message.splice(1);
   switch (addr) {
       case "/begin":
            $("#block").hide();
            var timestamp = Date.now();
            window.setInterval(function(){
                var timeleft = 600 - (Math.abs(timestamp - Date.now()))/1000;
               $("#countdown").text(Math.floor(timeleft/60) + ":" + Math.floor(timeleft%60)); 
            },1000)
           break;
       case "/crash":
           window.location = "http://localhost:5001/crash.html"
           break;
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
         break;
      case "/update":
         updateDirection.apply(this, args.slice(0, 3))
         updateThrust.apply(this, args.slice(3, 4))
         updatePosition.apply(this, args.slice(4, 7))
         break;
      case "/becomeShield":
         $("#shieldOn").removeClass("text-muted");
         $("#beamOn").addClass("text-muted");
         break;
      case "/becomeBeam":
         $("#shieldOn").removeClass("text-muted");
         $("#beamOn").addClass("text-muted");
         break;
      case "/becomeDrive":
         $("#thrust-meter").text("");
         break;
      case "/becomeParked":
         $("#thrust-meter").text("PARKED");
         break;
      case "/health":
          $("#health-level").empty();
      for(var i = 0; i<args; i++){
          $("#health-level").append("<div class='health-points'></div>");
      }
         console.log(args);
         break;
      case "/lock":
            $("#lock-status").text("Locked"); 
            break;
      case "/unlock":
            $("#lock-status").text("Waiting for lock"); 
          break;
      case "/astro":
         var id = args[0];
         var x = (args[1]  - 3500)/3 - 40;
         var y = (args[3] + 110)/3 - 290;
         var z = (args[2] - 430)/3 + 180;
         window.astros[id] = window.addAstronaut(x, y, z); //add astronaut and return scene object reference.
         break;
      case "/removeAstro": //TBD
        astro_saved++;
          update_astro(astro_saved);
         var id = args[0];
         window.removeAstronaut(astros[id]);
         break;
      default:
         console.error("Invalid OSC address", message);
         break;
   }
});

var updatePosition = function (a, b, c) {
   window.player.position.x = (a - 3550)/3 - 40;
   window.player.position.y = (c + 110)/3 - 290;
   window.player.position.z = (b - 430)/3 + 180;
   //  return;
   //  console.log("updatePosition", x, y, z);
   //  var newq = [z - 1000, x/3.5];
   //  var oldq = $('#position-indicator').offset();
   //  $('#position-indicator').css({ top: newq[0], left: newq[1] });
};

var INDICATOR_DIAMETER = $("#direction-indicator").height();
var updateDirection = function (yaw, pitch, roll) {
   console.log(pitch, yaw, roll);
   window.sphere.rotation.x = yaw/180 * Math.PI;
   window.sphere.rotation.z = -1 * roll/180 * Math.PI;
   window.sphere.rotation.y = -1 * pitch/180 *Math.PI;

   var c = window.sphere.rotation;
   window.player.rotation.set(c.x, c.y - Math.PI / 2, c.z);

   //  var scale = 125;
   //  var newX, newY;
   //  console.log("updateDirection", pitch, yaw, roll);
   //  pitch = pitch / 22;
   //  yaw = yaw / 22;
   //
   //  if (pitch > 0 && false) {
   //    newY = (1-pitch) * scale;
   //  } else {
   //    newY = scale + (-1 * pitch * scale);
   //  }
   //
   //  if (yaw > 0 && false) {
   //    newX = (1-yaw) * scale;
   //  } else {
   //    newX = scale + (yaw * scale);
   //  }
   //
   //  // Subtract half the width/height of the indicator
   //  var newq = [newY + INDICATOR_DIAMETER, newX - INDICATOR_DIAMETER / 2];
   //  var oldq = $('#direction-indicator').offset();
   //  $('#direction-indicator').css({ top: newq[0], left: newq[1] });
};

var updateThrust = function (percent) {
   percent = percent / 8;
   console.log("updateThrust", percent);
   $("#thrust-meter").width(percent + 50 + "%");
   if(Math.abs(percent) < 5){
      $("#thrust-meter").css("background-color", "white");
   }else if(percent > 0){
      $("#thrust-meter").css("background-color", "aquamarine");
   }else{
      $("#thrust-meter").css("background-color", "red");
   }
};

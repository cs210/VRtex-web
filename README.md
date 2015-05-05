# vrtex-web

Since today's web browsers do not natively support sending and receiving
messages over UDP (User Datagram Protocol) and OSC is a protocol over UDP, we
utilize a "web bridge," or server running on the client side that acts as an
intermediary, converting messages we send across web sockets in browser into
messages that support the OSC protocol. This code is provided by the
open-source osc-web app (https://github.com/automata/osc-web).

## Getting Started

First we must set up osc-web. See the documentation in osc-web/README.org.
osc-web requires node.js and socket.io. 

To run the bridge app in OS X or UNIX we open a shell to the VRtex-leap working
directory and:

	  cd osc-web
	  node bridge.js

Then open index.html in a web browser. When OSC messages are received, the
dashboard will update appropriately.

The browser listens on port 3334.

And that's it!

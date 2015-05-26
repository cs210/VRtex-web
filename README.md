# vrtex-web

Since today's web browsers do not natively support sending and receiving
messages over UDP (User Datagram Protocol) and OSC is a protocol over UDP, we
utilize a "web bridge," or server running on the client side that acts as an
intermediary, converting messages we send across web sockets in browser into
messages that support the OSC protocol. This code is provided by the
open-source osc-web app (https://github.com/automata/osc-web).

## Getting Started

First we must set up osc-web. See the documentation in osc-web/README.org.
osc-web requires that node.js and socket.io are installed. 

To run the bridge app in OS X or UNIX we open a shell to the VRtex-web working
directory and:

```sh
$ cd osc-web
$ npm install // only required once
$ node bridge.js
```

Then open we must start a server running locally. This is to prevent CORS exceptions when grabbing the local file models of the ISS and navball. The quickest way to get a local server running on OS X or UNIX is to cd to VRtex-web and then:

```sh
$ python -m SimpleHTTPServer
```
	

Now visit `http://localhost:8000/` in Chrome*.

*Right now Chrome is the only browser we support. We also require a screen resolution of 1650x1080 or higher and a full screen window.

The browser listens on port 3334.

And that's it!
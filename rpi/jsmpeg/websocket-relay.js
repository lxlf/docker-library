// Use the websocket-relay to serve a raw MPEG-TS over WebSockets. You can use
// ffmpeg to feed the relay. ffmpeg -> websocket-relay -> browser
// Example:
// node websocket-relay yoursecret 8081 8082
// ffmpeg -i <some input> -f mpegts http://localhost:8081/yoursecret

var fs = require('fs'),
  http = require('http'),
  WebSocket = require('ws');

if (process.argv.length < 4) {
  console.log(
    'Usage: \n' +
    'node websocket-relay.js <secret> [<websocket-port> <stream-port> <stream-port2>]'
  );
  process.exit();
}

var STREAM_SECRET = process.argv[2],
  WEBSOCKET_PORT = process.argv[3] || 8081,
  STREAM_PORT_1 = process.argv[4] || 8082,
  STREAM_PORT_2 = process.argv[5] || 8083,

  STREAM_CURRENT = 1,
  RECORD_STREAM = false;


// Websocket Server
var socketServer = new WebSocket.Server({ port: WEBSOCKET_PORT, perMessageDeflate: false });
socketServer.connectionCount = 0;
socketServer.on('connection', function (socket, upgradeReq) {
  socketServer.connectionCount++;
  console.log(
    'New WebSocket Connection: ',
    (upgradeReq || socket.upgradeReq).socket.remoteAddress,
    (upgradeReq || socket.upgradeReq).headers['user-agent'],
    '(' + socketServer.connectionCount + ' total)'
  );

  socket.on('message', function (message) {
    console.log('message', message);
    var obj = JSON.parse(message);
    if (obj.switch) {
      STREAM_CURRENT = obj.switch;
    }
  });

  socket.on('close', function (code, message) {
    socketServer.connectionCount--;
    console.log(
      'Disconnected WebSocket (' + socketServer.connectionCount + ' total)'
    );
  });

  socket.on('error', function (error) {
    console.log('SOCKET ERROR', error);
    socket.close();
  });
});
socketServer.broadcast = function (data) {
  socketServer.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

// HTTP Server to accept incomming MPEG-TS Stream from ffmpeg
var streamServer_1 = http.createServer(function (request, response) {
  var params = request.url.substr(1).split('/');

  if (params[0] !== STREAM_SECRET) {
    console.log(
      'Failed Stream Connection: ' + request.socket.remoteAddress + ':' +
      request.socket.remotePort + ' - wrong secret.'
    );
    response.end();
  }

  response.connection.setTimeout(0);
  console.log(
    'Stream Connected: ' +
    request.socket.remoteAddress + ':' +
    request.socket.remotePort
  );
  request.on('data', function (data) {
    if (STREAM_CURRENT === 1) {
      socketServer.broadcast(data);
    }
    if (request.socket.recording) {
      request.socket.recording.write(data);
    }
  });
  request.on('end', function () {
    console.log('close');
    if (request.socket.recording) {
      request.socket.recording.close();
    }
  });

  // Record the stream to a local file?
  if (RECORD_STREAM) {
    var path = 'recordings/' + Date.now() + '.ts';
    request.socket.recording = fs.createWriteStream(path);
  }
}).listen(STREAM_PORT_1);

// HTTP Server to accept incomming MPEG-TS Stream from ffmpeg
var streamServer_2 = http.createServer(function (request, response) {
  var params = request.url.substr(1).split('/');

  if (params[0] !== STREAM_SECRET) {
    console.log(
      'Failed Stream Connection: ' + request.socket.remoteAddress + ':' +
      request.socket.remotePort + ' - wrong secret.'
    );
    response.end();
  }

  response.connection.setTimeout(0);
  console.log(
    'Stream Connected: ' +
    request.socket.remoteAddress + ':' +
    request.socket.remotePort
  );
  request.on('data', function (data) {
    if (STREAM_CURRENT === 2) {
      socketServer.broadcast(data);
    }
    if (request.socket.recording) {
      request.socket.recording.write(data);
    }
  });
  request.on('end', function () {
    console.log('close');
    if (request.socket.recording) {
      request.socket.recording.close();
    }
  });

  // Record the stream to a local file?
  if (RECORD_STREAM) {
    var path = 'recordings/' + Date.now() + '.ts';
    request.socket.recording = fs.createWriteStream(path);
  }
}).listen(STREAM_PORT_2);

console.log('Listening for incomming MPEG-TS Stream on http://127.0.0.1:' + STREAM_PORT_1 + '/<secret>');
console.log('Listening for incomming MPEG-TS Stream on http://127.0.0.1:' + STREAM_PORT_2 + '/<secret>');
console.log('Awaiting WebSocket connections on ws://127.0.0.1:' + WEBSOCKET_PORT + '/');

var forever = require('forever-monitor');

var child = new forever.Monitor('server.js', {
  max: 3,
  silent: true,
  uid: 'fake-mc-skinserver'
});

child.on('exit', function () {
  console.log('server.js has exited after 3 restarts');
});

child.start();

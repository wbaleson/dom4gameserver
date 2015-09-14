var child_process = require('child_process'), ls;

ls = child_process.exec('dir', function (error, stdout, stderr) {
	console.log(stdout);
	console.log(stderr);
	console.log(ls.pid);
});
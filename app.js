
var exec = require('child_process').exec;
var cmd = 'nohup hexo s';

exec(cmd, function(error, stdout, stderr) {  
  process.exit(0);
});

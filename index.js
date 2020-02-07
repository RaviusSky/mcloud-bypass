var { exec } = require('child_process')
var http = require('http')

var port = process.env.PORT

http.createServer(function(req, res)
{
	if (req.url == "/favicon.ico")
	{
		res.end()
		return
	}

	console.log(req.url.substr(1))
	
	var cmd = 'curl '+unescape(req.url.substr(1))
	
	console.log(cmd)

	exec(cmd, (err, stdout, stderr) =>
	{
		if (err)
		{
			console.error(err)
		}

		res.write(stdout)
		res.end();
	});
}).listen(port)

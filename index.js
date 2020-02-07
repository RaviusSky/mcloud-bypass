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
	
	if (req.url.includes("mcloud"))
	{
		options = {
			hostname: "mcloud.to",
			port: 80,
			path: req.url.split("mcloud.to")[1],
			method: 'GET',
			headers: { 'referer': 'https://fmovies.to' }
		}
		var r2 = http.request(options, (res) => {
			res.on('data', (d) => {
				console.log(d)
				res.write(d)
				res.end();
			})
		})
		r2.end()
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
		
		console.log(stdout)

		res.write(stdout)
		res.end();
	});
}).listen(port)

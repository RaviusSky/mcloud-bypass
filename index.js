const http = require('http')

http.createServer(function(req, res)
{
	requestBody(req.url, function(body)
	{
		res.write(body)
		res.end()
	})
}).listen(process.env.PORT)

function requestBody(url, callback)
{
	const options = {
		hostname: 'mcloud.to',
		port: 443,
		path: url,
		method: 'GET',
		headers: { referer: 'https://fmovies.to' }
	}

	var x = http.request(options, function(res)
	{
		var data = ""

		res.on('data', function(temp){
			data += temp
		})

		res.on('end', function()
		{
			console.log(data.toString('utf8'))

			callback(data.toString('utf8'))
		})
	});

	x.end()
}

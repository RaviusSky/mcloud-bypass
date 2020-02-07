const http = require('https')

requestBody("/embed/zkl9r3?key=458db9dabc5e92d1c54c3e17d1cf9242", function(res) {
	console.log(res)
})

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

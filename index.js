/*
Mcloud referer bypass by Ravius
*/
const https = require('https')
const http = require('http')


http.createServer(function(req, res)
{
	requestBody(req.url, function(body)
	{
		res.write(body)
		res.end()
	})
}).listen(8585)

function requestBody(url, callback)
{
	const options = {
		hostname: 'mcloud.to',
		port: 443,
		path: url,
		method: 'GET',
		headers: { referer: 'https://fmovies.to' }
	}

	var x = https.request(options, function(res)
	{
		var data = ""

		res.on('data', function(temp){
			data += temp
		})

		res.on('end', function()
		{
			if (typeof data.toString('utf8') != undefined)
			{
				if (data.toString('utf8').includes('file":"'))
				{
					console.log(data.toString('utf8').split('file":"')[1].split('"')[0])

					callback(data.toString('utf8').split('file":"')[1].split('"')[0])
				}
				else
				{
					console.log("Error Occured: Media missing from request")
					callback("Error Occured: Media missing from request")
				}
			}
			else
			{
				console.log("Error Occured: Data is undefined")
				callback("Error Occured: Data is undefined")
			}
		})
	});

	x.end()
}

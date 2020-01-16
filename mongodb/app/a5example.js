//Andrew Knickman
//COSC 484
//Assignment 5

var http = require("http");
var url = require('url');
var qsr; //query search result for iso-format time (parse or unix)

var server = http.createServer(function(req, res) 
{
    var parsedURL = url.parse(req.url, true);//parse URL query
    var path = parsedURL.pathname;
    var time = new Date(parsedURL.query.iso); (pull )
    
    //if path is parsetime and 'parsetime' is found
    if(path === '/api/parsetime' &&
    req.url.search('parsetime') != -1) 
    {
        //with parsetime in query, qsr is in hours, minutes, and seconds
        qsr = {"hour": time.getHours(),
        "minute": time.getMinutes(),
        "second": time.getSeconds()};
    }
    //if path is unixtime and 'unixtime' is found
    else if(path === '/api/unixtime' && 
    req.url.search('unixtime') != -1)
    {
        //with unixtime in query, qsr is in milliseconds
        qsr = {"unixtime": time.getTime()}
    }

    //if no qsr was identified, return 401
    if (qsr)
    {
        res.writeHead(200, {'content-type': 'application/json'});
        res.send(qsr);
        res.end(JSON.stringify(qsr));
    }
    //if qsr is identified, return 200
    else
    {
        res.writeHead(401);
        res.send(401);
        res.end();
    }
});

//convert port parameter passed in command line to number value
function argToPortNum(arg)
{
    return Number(arg);
}

server.listen(argToPortNum(process.argv[2]));

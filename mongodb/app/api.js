//Andrew Knickman
//COSC 484
//Assignment 5

var http = require("http");
var url = require('url');
var qsr; //query search result for iso-format time (parse or unix)

var server = http.createServer(function(req, res) 
{
    var parsedURL = url.parse(req.url, true);//parse URL
    var query = parsedURL.query.iso;//get query
    var path = parsedURL.pathname;//get path name
    var time = new Date(query);//pull iso date from query
    if(res.method === 'GET')
    {
        /*if path is strictly parsetime 
        and 'parsetime' is found*/
        if(path === '/api/parsetime' &&
        req.url.search('parsetime') != -1) 
        {
            /*with parsetime in query, 
            qsr is in hours, minutes, and seconds*/
            qsr = {hour: time.getHours(),
            minute: time.getMinutes(),
            second: time.getSeconds()};
        }
        /*if path is strictly unixtime 
        and 'unixtime' is found*/
        else if(path === '/api/unixtime' && 
        req.url.search('unixtime') != -1)
        {
            //with unixtime in query, qsr is in milliseconds
            qsr = {unixtime: time.getTime()}
        }

        //if qsr was identified, return 200 and JSON data
        if (qsr)
        {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(qsr));
        }
        //if qsr is not identified, return 401
        else
        {
            res.writeHead(401);
            res.end();
        }
    }
    else
    {
        res.writeHead(401);
        res.end('Needs a GET request');
    }
    
});

//convert port parameter passed in command line to number value
function argToPortNum(arg)
{
    return Number(arg);
}

server.listen(argToPortNum(process.argv[2]));

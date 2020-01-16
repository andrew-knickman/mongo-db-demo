var express = require('express');
var app = express();

// Change path to something else
app.get('/testDir', function(req, res){
	var testBlob = {age: 25, name: "Jal Irani"};
   res.send(testBlob);
});

console.log("Navigate to http://localhost:3000/")


// Can make the second param a function
app.listen(3000);
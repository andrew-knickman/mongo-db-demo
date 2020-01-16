var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:3000/db"

MongoClient.connect(url, function(err,db)
{
    if(err)
    {
        throw err;
    }
    console.log("DB is created!");
    db.createCollection("customers", function(err, res)
    {
        if(err)
        {
            throw err;
        }
        console.log("Customers collection created!");
    });
    
    var inputCustomers = [
        {name:"Nate", address:"123 Main Street"},
        {name:"James", address:"1834 South Charles"},
        {name:"Tupac", address:"222 Thugs Mansion Drive"},
        {name:"Fred", address:"5 Cavan Green Circle"},
        {name:"Cassie", address:"56 Riverside Avenue"}];

    db.collection("customers").insertMany(inputCustomers, function(err, res)
    {
        if(err) throw err;
        console.log("Number of customers inserted: " + res.insertedCount);
    });

    //return customer names in ascending order
    var mysort = {name: 1};
    db.colelction("customers").find().sort(mysort).toArray(function(err, res)
    {
        {
            if(err) throw err;
        }
        console.log(res);
    });

    //update Cassie's address
    var keyQuery = {address:"56 Riverside Avenue"};
    var newVal = {address:"1244 William Street"};
    db.collection("customers").updateOne(KeyQuery, newVal, function(err, res){
        if(err){throw err;}
        console.log("Cassie's address updated!");
    });

    //delete the customer collection
    db.collection("customers").drop(function(err, deleteOK){
        if(err) {throw err;}
        if(deleteOK)
        {
            console.log("Customers collection deleted!")
        }
        db.close();
    });

    db.close();
});
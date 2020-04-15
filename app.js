const express = require("express");
const bodyParser = require('body-parser');
const app =  express();
const MongoClient = require('mongodb').MongoClient;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require('dotenv').config();
const mongoUrl =  process.env.MONGO_URL;

let db;
const dbName = 'hadya'
let jobsCollection;

// TODO collection anme
MongoClient.connect(mongoUrl, (err, client) => {
    if (err) return console.log(err);
    console.log(`Connected MongoDB: ${mongoUrl}`);
    db = client.db(dbName);
});

// page to either login or to request food basket

app.get('/', function(req, res){
    res.send("Hadya API");
});


app.get('/foodBasketRequest', function(req, res){
    db.collection('foodBaskets').find().toArray().then(results => {
        console.log(results)
        res.json(results);
    });
});

app.post('/foodBasketRequest', function(req, res){
    console.log(req.body);
    let job = {};
    // TODO server side validation
    if (!db){
        res.status(500).send();
        return console.log("error in creating  job in jobs collection");
    }
    let fb = {};
    fb.name = req.body.name;
    fb.nationalId = req.body.nationalId;
    fb.natonality = req.body.nationality;
    fb.phone = req.body.phone;
    fb.numDependants = req.body.numDependants;
    fb.quantity = 1;
    fb.time = new Date();
    db.collection('foodBaskets').insertOne(fb).then(result => {
        //TODO: fix response to return only the job inserted not the whole collection
        console.log(result)
        res.json(result);
      })
      .catch(error => {console.error(error)
        res.status(500).send();
    });
});

app.post('/login', function(req, res){
    // todo if admin redirect to admin page
    // todo if distributer redirect to distributer page
});

app.get('/admin', function(req, res){
    // authentication is required for this function
    // TODO display system stats if admin
    // TODO redirect to login if not authenticated 
});

app.get('/dist', function(req, res){
    // distributer page can search for acceptos using 
});

app.get('/acceptorProfile', function(req, res){
    // get acceptor profile using phone number and id
    // either respond with profile or with doesnot exit

});
app.listen(process.env.PORT || 3000, 
    () => console.log("Server is running..."));

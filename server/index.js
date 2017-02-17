var express = require('express')
var bodyParser = require('body-parser');
var app = express()

//Set up middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

//Set up routes
app.route('/')
    .get((req,res) => {
        res.send('hello world')
    })
    .post((req,res) => {
        console.log(req.body);
        res.end();
    })

//Start server
app.listen(3000, function () {
  console.log('Listening on port 3000!')
})

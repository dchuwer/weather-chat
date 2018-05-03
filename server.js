var express = require('express');

var app = express();
app.listen(7000);


app.use(express.static('public'));
app.use(express.static('node_modules'));

app.get('/', function(request, response){
    response.send("Listening in Port 7000 ");
  });
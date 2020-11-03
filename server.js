//Install express server
const express = require('express');
const path = require('path');
const request = require('request');
const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/infinite-wonderwater'));

app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname+'/dist/infinite-wonderwater/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);

// prevents heroku from setting wbesite to sleep due to inactivity
setInterval(() => {
    request('https://rapidapi.p.rapidapi.com/trending',(err) => {
      if (err) console.log(err);
      console.log('sucessfully reached website');
    });
  }, 1500000); // every 5 minutes (300000)
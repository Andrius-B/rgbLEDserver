const spawn = require('child_process').spawn;
var express = require('express');
var app = express();
//express is used to supply the static js picker page
//which communicates with this server
app.use(express.static("public"));
console.log("Openning serial port");


/*spawns a process, sendHex.py to be more precise
 which is in this directory, and it expects hex codes to be sent through standard input
 pipes, and then it transfers them to the arduino through a port selected in the applications code
 */
var hexSender = spawn('python3', ["sendHex.py"], {shell:false});


//stream all the data from the child proc
hexSender.stdout.on('data', function(data){
    console.log("python: "+data)
});
hexSender.stderr.on('data', function(data){
    console.log("python: "+data)
});



var color = "000000";


app.get('/disp', function (req, res) {
    res.status(200).send(color);
    //used for checking the current color
});

app.get('/color', function (req, res) {
    console.log("color selected: #"+req.query.color);
    color = req.query.color;
    res.status(200).send("fainai, fainai"); //must stay low key with my compliments
    hexSender.stdin.write(req.query.color+"\n"); //write the color hex to child proc
    //all output should terminate with a newline char '\n', because it is a coded terminating character
});

app.get('/', function(req, res){
    res.status(200).send("hai");
});

app.listen(416, function () {
    console.log('Waiting for colors..')
});
var express = require('express');
var app = express();
var morgan = require('morgan');
const router =express.Router();
var mongoose = require('mongoose');
var config = require('./config/database');
const path = require('path');
const authentication = require('./routes/authentication')(router);
const bodyParser = require('body-parser');
const cors=require('cors');


app.use(morgan('dev'));

mongoose.Promise = global.Promise;
mongoose.connect(config.uri,(err)=>{
	if(err){
		console.log('could not connect to db',err);
	}else{
		console.log('succefully connected');
	}
});

//middleware
app.use(cors({
	origin:'http:/localhost:4200'
}));
app.use(bodyParser.urlencoded({  extended: false}))
app.use(bodyParser.json());
app.use(express.static(__dirname +'/client/dist/'));
app.use('/authentication',authentication);


app.get('/',(req,res)=>{
	res.send('hello wrld');
})

app.listen(8080,()=>{
	console.log('listening on port 8080');
})

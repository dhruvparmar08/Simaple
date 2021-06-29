const express = require('express');
const app = express();
const port = process.env.port || 8080;
const morgan = require('morgan');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
const user = require('./model/user');
const cors = require('cors')
var router = express.Router();
var appRoutes = require("./route/api")(router);

const corsOptions = {
    origin: '*'
}

app.use(cors(corsOptions))

app.use('/uploads',express.static('uploads'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api',appRoutes);

mongoose.connect('mongodb+srv://mongodbuser:mongodbuser@cluster0-mvmyh.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true,  useCreateIndex: true, useUnifiedTopology: true });
//mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true,  useCreateIndex: true, useUnifiedTopology: true});
var conn = mongoose.connection;

conn.on('connected', function(){
    console.log("Successfully connected !!!");
});
conn.on('disconnected', function(){
    console.log("Successfully disconnected !!!");
});
conn.on('error', console.error.bind(console, 'connection error:'));

app.listen(port, function(){
    console.log("connected "+port);
});
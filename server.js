const express = require('express');
const app = express();
const port = process.env.port || 8080;
const morgan = require('morgan');
const multer  = require('multer');
const upload = require("./middleware/upload");
const path = require("path");
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
const user = require('./model/user');
var router = express.Router();
var appRoutes = require("./route/api")(router);


app.use('/uploads',express.static('/uploads'));
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

app.get('/', (req,res) => {
    res.sendFile('./public/index.html');
})


// app.post('/profile', function (req, res) {

//     upload(req, res, function(err) {
//         if(err) {
//             if( err.code === 'LIMIT_FILE_SIZE'){
//                 res.json({ success: false, message: 'Profile Image too large !!!'});
//             } else if( err.code === 'filetype' ) {
//                 res.json({ success: false, message: 'Invaild : Only jpeg, jpg and png supported !!!'});
//             } else {
//                 console.log(err);
//                 res.json({ success: false, message: 'Profile Image not upload !!!'});
//             }
//         } else {
//             if(!req.file) {
//                 res.json({ success: false, message: 'no file selected !!!'});
//             } else{
//                 // user.livingroom = req.file.filename;
//                 // user.save(function(err){
//                 //     if(err){
//                 //         console.log(err);
//                 //     }
//                 // });
                
//                 console.log(JSON.stringify(req.file.filename))
//                 res.json({ success: true, message: 'Profile Image Uploaded Successfully' });
//             }
//         }
//     })
// })

app.listen(port, ()=> console.log("connected with", port));
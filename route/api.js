var User = require('../model/user');
const multer  = require('multer');
const upload = require("../middleware/upload");
var jwt = require('jsonwebtoken');

module.exports = function(router){

    router.post('/profile' , (req , res)=>{
    
        upload(req, res, function(err) {
            if(err) {
                if( err.code === 'LIMIT_FILE_SIZE'){
                    res.json({ success: false, message: 'Profile Image too large !!!'});
                } else if( err.code === 'filetype' ) {
                    res.json({ success: false, message: 'Invaild : Only jpeg, jpg and png supported !!!'});
                } else {
                    console.log(err);
                    res.json({ success: false, message: 'Profile Image not upload !!!'});
                }
            } else {
                if(!req.file) {
                    res.json({ success: false, message: 'No file selected !!!'});
                } else{
                    let user = new User();

                    user.name = req.body.name;
                    user.email = req.body.email;
                    user.mobile = req.body.mobile;
                    user.password = req.body.password;
                    user.address = req.body.address;
                    user.profile_file = req.file.filename;
                    user.profile_path = req.file.path;
                    user.save(function(err){
                        if(err){
                            console.log(err.errors.name);
                            if(err.errors.name) {
                                res.json({ success: false, message: "Name is required" });    
                            } else if(err.errors.email) {
                                res.json({ success: false, message: "E-mail is required" });    
                            } else if(err.errors.mobile) {
                                res.json({ success: false, message: "Mobile is required" });    
                            } else if(err.errors.password) {
                                res.json({ success: false, message: "Password is required" });    
                            } else {
                                res.json({ success: false, message: err });
                            }
                        } else {
                            res.json({ success: true, message: 'Registration Successfully' });
                        }
                    });
                }
            }
        })
    
    })

    router.get('/users', (req, res) => {
        User.find({}).exec(function(err, user) {
            if(err) throw err;
            if(!user) {
                res.json({ success: fale, message: 'User not found' });
            } else {
                res.json({ success: true, message: 'get details Successfully', data: user });
            }
        })
    })


    return router;
}
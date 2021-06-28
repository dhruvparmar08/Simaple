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
                console.log(req.file);
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
                    console.log(JSON.stringify(req.file.filename));
                }
            }
        })
    
    })


    return router;
}
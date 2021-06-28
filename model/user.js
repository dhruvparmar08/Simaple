var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var titlize = require('mongoose-title-case');


var UserSchema = new Schema({
    name : { type: String, required: true },
    email : { type: String, required: true, lowercase:true },
    mobile : { type: String, required: true },
    password : { type: String, required: true, select: false },
    address : { type: String, },
    profile_file: { type: String, required: true}
});

UserSchema.pre('save', function(next) {
    var user = this;
    
    if (!user.isModified('password')) return next();
    bcrypt.hash(user.password, null, null, function(err, hash) {
        if (err) return next(err); 
        user.password = hash; 
        next(); 
    });
});

UserSchema.plugin(titlize, {
    paths: ['name']
});

UserSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password); 
};

module.exports = mongoose.model('imagedetails', UserSchema);

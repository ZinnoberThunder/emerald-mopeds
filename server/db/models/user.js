var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var autoIncrement = require('mongoose-auto-increment');

var SALT_WORK_FACTOR = 10;

var userSchema = mongoose.Schema({
  _id: Number,
  email: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  api_token: String
});

userSchema.pre('save', function(next) {
    var user = this;
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    }.bind(user));
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

userSchema.plugin(autoIncrement.plugin, 'User');

var User = mongoose.model('User', userSchema);

module.exports = User;

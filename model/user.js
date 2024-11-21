const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    
    email:{
        type:String,
        required:true,
        unique:true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please fill a valid email address'],
    },
    password:{
        type:String,
        required:true,
        minlength: [6, 'Password must be at least 6 characters long']
    },
    createdAt: {
        type: Date,
        default: Date.now,
      },
      updatedAt: {
        type: Date,
        default: Date.now,
      }

})


userSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const userModel = mongoose.model("userSchema", userSchema);

module.exports = userModel;
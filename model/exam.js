const mongoose = require('mongoose')

const examSchema = new mongoose.Schema({

      date:{
        type:Date,
        required:true,
        unique:true
      },
      classId:{
        type:mongoose.Schema.ObjectId,
        ref:"classSchema",
        required:true,
        unique:true
      },
      className:{
        type:String,
        required:true,
        minlength: [3, 'Name must be at least 3 characters long'],
      },
      totalQuestion:{
        type:Number,
        required:true
      },
      maxNo:{
        type:Number,
        required:true
      },
      duration:{
        type:String,
        required:true
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

examSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
  });

const examModel = mongoose.model('examSchema',examSchema)

module.exports = examModel;





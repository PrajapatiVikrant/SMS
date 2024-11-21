const mongoose = require('mongoose')

const classSchema = new mongoose.Schema({

      name:{
        type:String,
        required:true,
        minlength: [3, 'Name must be at least 3 characters long'],
      },
      teacherId:{
        type:mongoose.Schema.ObjectId,
        ref:"teacherSchema",
        required:true
      },
      studentCount:{
        type:Number,
        default:0
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

classSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
  });

const classModel = mongoose.model('classSchema',classSchema)

module.exports = classModel;





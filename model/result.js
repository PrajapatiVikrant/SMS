const mongoose = require('mongoose')

const resultSchema = new mongoose.Schema({

      date:{
        type:Date,
        required:true,
      },
      examId:{
        type:mongoose.Schema.ObjectId,
        ref:"examSchema",
        required:true
      },
      classId:{
        type:mongoose.Schema.ObjectId,
        ref:"classSchema",
        required:true
      },
      className:{
        type:String,
        required:true,
        minlength: [3, 'Name must be at least 3 characters long'],
      },
      studentId:{
        type: mongoose.Schema.ObjectId,
        ref: "studentSchema",
        required: true
      },
      studentName:{
         type:String,
         required:true
      },
      maxNo:{
        type:Number,
        required:true
      },
      score:{
        type:Number,
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

resultSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
  });

const resultModel = mongoose.model('resultSchema',resultSchema)

module.exports = resultModel;





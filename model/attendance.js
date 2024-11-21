const mongoose = require('mongoose')

const attendanceSchema = new mongoose.Schema({

    date:{
        type:Date,
        required:true,
    },
    studentId:{
        type:mongoose.Schema.ObjectId,
        ref:"studentSchema",
        required:true
    },
    classId: {
        type: mongoose.Schema.ObjectId,
        ref: "classSchema",
        required: true
    },
    status:{
        type:Boolean,
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
attendanceSchema.index({ date: 1, studentId: 1 }, { unique: true });
attendanceSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const attendanceModel = mongoose.model('attendanceSchema', attendanceSchema)

module.exports = attendanceModel;


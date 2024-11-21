require('./config/db')
const express = require('express')
const {config } = require('dotenv')
const fileUpload = require("express-fileupload")
config();

const app = express();
const port = process.env.PORT
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Auth
app.use('/SMS/auth/api',require('./routes/auth.route'))

//Student
app.use('/SMS/student/api',require('./routes/student.route'))

//Teacher
app.use('/SMS/teacher/api',require('./routes/teacher.route'))

//Class
app.use('/SMS/class/api',require('./routes/class.route'))

// attendance
app.use('/SMS/attendance/api',require('./routes/attendance.route'))

//exam
app.use('/SMS/exam/api',require('./routes/exam.route'));

//result
app.use('/SMS/result/api',require('./routes/result.route'));

app.listen(port,()=>{
    console.log(`server listen at ${port}`)
})
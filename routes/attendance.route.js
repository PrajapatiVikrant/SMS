const express = require('express')
const attendance = require('../controller/attendance.controller')
const router = express.Router()

const adminOrTeacherVerify = require('../middleware/adminOrTeacherVerify')
const adminVerify = require('../middleware/adminVerify')
const jwtVerify = require('../middleware/jwtVerify')

//add new attendance
router.post('/',jwtVerify,adminOrTeacherVerify,attendance.addAttendance)

//get all attendance data
router.get('/:classId', jwtVerify, adminOrTeacherVerify,attendance.getAll)

//get all attendance data of given date and classId
router.get('/:classId/:date',jwtVerify, adminOrTeacherVerify,attendance.getInDate)

//get single attendance data of single student in single date
router.get('/:classId/:date/:studentId',jwtVerify, adminOrTeacherVerify,attendance.getSingleStudentInDate);



module.exports = router
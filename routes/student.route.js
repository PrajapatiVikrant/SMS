const express = require('express')
const router = express.Router()
const student = require('../controller/student.controller')
const adminOrTeacherVerify = require('../middleware/adminOrTeacherVerify')
const adminVerify = require('../middleware/adminVerify')
const jwtVerify = require('../middleware/jwtVerify')
const studentVerify = require('../middleware/studentVerify')


//get all student          only for teacher and admin
router.get('/:classId/:pageNo',jwtVerify,adminOrTeacherVerify,student.getAll)


//get student by id          for teacher or admin
router.get('/:studentId',student.getById)


//add new student        only for any 
router.post('/',jwtVerify,student.create)


//update student        only for admin 
router.put('/:studentId',jwtVerify,adminVerify,student.updateStudent)


//update student                      for student
router.put('/upload/:studentId',jwtVerify,studentVerify,student.uploadProfileImage)


//delete student        only for admin 
router.delete('/:studentId',jwtVerify,adminVerify,student.deleteStudent)


module.exports = router
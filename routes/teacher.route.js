const express = require('express')
const router = express.Router()
const teacher = require('../controller/teacher.controller')
const adminOrTeacherVerify = require('../middleware/adminOrTeacherVerify')
const adminVerify = require('../middleware/adminVerify')
const jwtVerify = require('../middleware/jwtVerify')
const teacherVerify = require('../middleware/teacherVerify')

//get all teacher        for admin
router.get('/:pageNo',jwtVerify,adminVerify,teacher.getAll)


//get teacher by id       for admin or teacher
router.get('/single/:teacherId',jwtVerify,adminOrTeacherVerify,teacher.getById)


//add new teacher            for admin
router.post('/',jwtVerify,adminVerify,teacher.create)


//update teacher             for admin
router.put('/:teacherId',jwtVerify,adminVerify,teacher.updateTeacher)


//upload  teacher image                     for teacher
router.put('upload/:teacherId',jwtVerify,teacherVerify,teacher.uploadProfileImage)



//delete teacher             for admin
router.delete('/:teacherId',jwtVerify,adminVerify,teacher.deleteTeacher)


module.exports = router
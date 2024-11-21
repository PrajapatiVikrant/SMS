const express = require('express')
const router = express.Router()
const classController = require('../controller/class.controller')
const adminOrTeacherVerify = require('../middleware/adminOrTeacherVerify')
const adminVerify = require('../middleware/adminVerify')
const jwtVerify = require('../middleware/jwtVerify')


//get all classes
router.get('/:pageNo',jwtVerify,adminVerify,classController.getAll)


//get class by id                     for teacher or admin
router.get('/single/:classId',jwtVerify,adminOrTeacherVerify,classController.getById)


//create a class           only for admin 
router.post('/',jwtVerify,adminVerify,classController.create)


//assign teacher to a class        only for admin 
router.put('/assign/teacher/:classId',jwtVerify,adminVerify,classController.assignTeacher)


//update class       only for admin 
router.put('/:classId',jwtVerify,adminVerify,classController.updateClass)


//delete class       only for admin 
router.delete('/:classId',classController.deleteClass)



module.exports = router
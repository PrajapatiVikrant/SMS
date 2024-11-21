const express = require('express')
const exam = require('../controller/exam.controller')
const router = express.Router()

const adminOrTeacherVerify = require('../middleware/adminOrTeacherVerify')
const adminVerify = require('../middleware/adminVerify')
const jwtVerify = require('../middleware/jwtVerify')

//create exam
router.post('/',jwtVerify,adminVerify,exam.create)


// get all exam
router.get('/',jwtVerify,adminOrTeacherVerify,exam.getAll)


//get exam by exam id
router.get('/:examId',jwtVerify,adminOrTeacherVerify,exam.getSingleExam)


//update exam by examId
router.put('/:examId',jwtVerify,adminVerify,exam.update)


//delete exam by examId
router.delete('/:examId',jwtVerify,adminVerify,exam.delete)




module.exports = router
const express = require('express')
const result = require('../controller/result.controller')
const router = express.Router()

const adminOrTeacherVerify = require('../middleware/adminOrTeacherVerify')
const adminVerify = require('../middleware/adminVerify')
const jwtVerify = require('../middleware/jwtVerify')

//create result
router.post('/',jwtVerify,adminVerify,result.create)


// get all result
router.get('/',jwtVerify,adminOrTeacherVerify,result.getAll)


//get result by result id
router.get('/:resultId',jwtVerify,adminOrTeacherVerify,result.getSingleResult)


//update result by resultId
router.put('/:resultId',jwtVerify,adminVerify,result.update)



//delete result by result id
router.delete('/:resultId',jwtVerify,adminVerify,result.delete)




module.exports = router
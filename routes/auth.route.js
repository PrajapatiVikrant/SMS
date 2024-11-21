const express = require('express')
const router = express.Router()
const auth = require('../controller/auth.controller')


//login 
router.post('/login',auth.login)

//signup for all user
router.post('/signup',auth.signup)



//signup only for admin
router.post('/signup/:admin_secret',auth.adminSignup)


module.exports = router
const adminModel = require("../model/admin");
const teacherModel = require("../model/teacher");



const adminOrTeacherVerify = async(req,res,next)=>{
        const {email} = req.user;
        try{
            const admin = await adminModel.findOne({email})
            const teacher = await teacherModel.findOne({email});
            if(admin || teacher){
                next();
            }else{
                return res.json({
                    message:"Not access"
                })
            }
            
        }catch(error){
            return res.json({
                message:error.message
            })
        }


}

module.exports = adminOrTeacherVerify;
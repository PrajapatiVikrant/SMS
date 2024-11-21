

const teacherModel = require("../model/teacher");


const teacherVerify = async(req,res,next)=>{
        const {email} = req.user;
        try{
            const student = await teacherModel.findOne({email})
            if(student){
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

module.exports = teacherVerify;
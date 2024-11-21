const studentModel = require("../model/student");




const studentVerify = async(req,res,next)=>{
        const {email} = req.user;
        try{
            const student = await studentModel.findOne({email})
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

module.exports = studentVerify;
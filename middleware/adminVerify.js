const adminModel = require("../model/admin");



const adminVerify = async(req,res,next)=>{
        const {email} = req.user;
        try{
            const admin = await adminModel.findOne({email})
            if(admin){
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

module.exports = adminVerify;
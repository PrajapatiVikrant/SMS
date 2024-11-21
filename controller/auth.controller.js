const { config } = require('dotenv')
config();
const bcrypt = require('bcrypt');
const adminModel = require('../model/admin');
const jwt = require('jsonwebtoken');
const userModel = require('../model/user');




//authentication controller
const auth = {
  
    login:async(req,res)=>{
        const {email,password} = req.body;
        try {
            
            //check admin user
            const admin = await adminModel.findOne({email:email});
            
            if(admin){
                
               
                const passwordMatch = await bcrypt.compare(password,admin.password);
                if(!passwordMatch){
                  
                  return res.status(401).json({
                    message:"wrong password"
                  })

                }

                const token = await jwt.sign({email},process.env.JWT_SECRET,{ expiresIn: '1h' })
                return res.status(200).json({
                  message:"Login successfully",
                  token:token
                })
            }




           
           
            //website user  like student, teacher, normal user 
            const user = await userModel.findOne({email:email});
            if(user){
                const passwordMatch = await bcrypt.compare(password,user.password);
                if(!passwordMatch){
                  
                  return res.status(401).json({
                    message:"wrong password"
                  })

                }

                const token = await jwt.sign({email},process.env.JWT_SECRET,{ expiresIn: '1h' })
                return res.status(200).json({
                  message:"Login successfully",
                  token:token
                })
            }

            return res.status(404).json({
                message:"User not found."
            })



        } catch (error) {
           return res.json({
            message:error.message
           }) 
        }
    },







    

    // signup for all
    signup:async(req,res)=>{
        const {email,password} = req.body;
      
        try {
          


            if(!email || !password){
                
                return res.status(400).json({
                    message:"both email and password are required"
                })
            }

            const user = await userModel.findOne({email});

            if(user){
                return res.json({
                    message:"user already exist"
                })
            }

            const hashPassword = await bcrypt.hash(password,10)
            console.log(hashPassword)
            const data = new userModel({
                email,
                password:hashPassword
            })

            await data.save();

            return res.status(201).json({
                message:"Sign up successfully"
            })
   

        } catch (error) {
            return res.json({
                message:error
            })
        }
    },



    // signup for only admin
    adminSignup:async(req,res)=>{
      
       
        const {email,password} = req.body;
        const {admin_secret} = req.params;
        try {
          
            //chect authorized person for create new admin account
            if(admin_secret != process.env.ADMIN_SECRET_KEY){
               
               return res.status(401).json({
                    message:"You are not authorized person"
                })
            }


            if(!email || !password){
                
                return res.status(400).json({
                    message:"both email and password are required"
                })
            }
            const admin = await adminModel.findOne(email);
            if(admin){
                return res.json({
                    message:"user already exist"
                })
            }
            const hashPassword = await bcrypt.hash(password,10)
            console.log(hashPassword)
            const data = new adminModel({
                email,
                password:hashPassword
            })

            await data.save();

            return res.status(201).json({
                message:"Sign up successfully"
            })
   

        } catch (error) {
            return res.json({
                message:error
            })
        }
        
    }


}
module.exports = auth;
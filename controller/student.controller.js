const studentModel = require("../model/student");
const {config} = require('dotenv')
config();
const cloudinary  =  require("cloudinary").v2;
const bcrypt = require('bcrypt');
const classModel = require("../model/class");


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });


const student = {



       //by admin
       create:async(req,res)=>{
        const {name,email,classId} = req.body;
      
        

        try {
            const student = await studentModel.findOne({email});
            if(student){
                return res.json({
                    message:"student already exist"
                })
            }
            
            const data = new studentModel({
                name,
                email,
                classId,
              
            })
            await data.save();
            await classModel.updateOne({_id:classId},{$inc: {studentCount:1}});
            return res.status(201).json({
                message:"student created successfully"
            })
        } catch (error) {
            return res.json({
                message:error.message
            })
        }

       },

       

       //get all student in system
       getAll:async(req,res)=>{
        const {classId,pageNo} = req.params;
          try {
            if(pageNo<1){
                return res.json({
                    message:"page will started from 1"
                })
            }
            const data = await studentModel.find({classId:classId});
            const totaldata = data.length+1;
            const totalPage = Math.floor(totaldata/3);
            const integerNo = parseInt(pageNo)
            const resdata = await studentModel.find({classId:classId}).skip((integerNo-1)*3).limit(3);
            return res.json({
                currentPage:pageNo,
                pageData:resdata,
                nextPage:(integerNo==totalPage)?"no page":integerNo+1,
                previousPage:(pageNo==1)?"no page":integerNo-1,
                totalPage:totalPage
            })
            

          } catch (error) {
            return res.json({
                message:error.message
            })
          }
       },



       //get specific student by id
       getById:async(req,res)=>{
        const {studentId} = req.params;
        console.log(studentId)
        try {
            const data = await studentModel.findOne({_id:studentId});
           
            return res.status(200).json(data)
          
            

          } catch (error) {
            console.log(error)
            return res.json({
                message:error
            })
          }
       },





       //by admin
       updateStudent:async(req,res)=>{
        const {name,email,classId} = req.body;
        const {studentId} = req.params;
        try {
            await studentModel.updateOne({_id:studentId},{name,email,classId});

            return res.json({
                 message:"student updated successfully"
            })
            

          } catch (error) {
            return res.json({
                message:error.message
            })
          }
       },



       //only for student
       uploadProfileImage:async(req,res)=>{
       
        const {studentId} = req.params;
        const {url} = req.body
        
        console.log(req.files)
        const file = req.files.profileImage;
        try {
            if(url){
                const arr = url.split("/")
                const lastItem = arr[arr.length-1]
                const deleteImage = lastItem.split(".")[0];
                const deleteExistImage = await cloudinary.uploader.destroy(deleteImage);
            }
            const upload = await cloudinary.uploader.upload(file.tempFilePath);
            await studentModel.updateOne({_id:studentId},{profileImageUrl:upload.url});
            
            return res.json({
                message:"profile image updated"
            })


        } catch (error) {
            return res.json({
                message:error.message
            }) 
        }
       },


       deleteStudent:async(req,res)=>{
        const {studentId,url} = req.params;
        try {
            if(url){
                const arr = url.split("/")
                const lastItem = arr[arr.length-1]
                const deleteImage = lastItem.split(".")[0];
                const deleteExistImage = await cloudinary.uploader.destroy(deleteImage);
            }
            await studentModel.deleteOne({_id:studentId});

            return res.json({
                 message:"student deleted successfully"
            })
            

          } catch (error) {
            return res.json({
                message:error.message
            })
          }
       }

}

module.exports = student;
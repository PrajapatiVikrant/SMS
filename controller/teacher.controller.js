const teacherModel = require("../model/teacher");
const {config} = require('dotenv')
config();
const bcrypt = require('bcrypt')
const cloudinary  =  require("cloudinary").v2;


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });


const teacher = {



    //only for admin
    create:async(req,res)=>{
        const {name,email,subject} = req.body;
      
        

        try {
            const teacher = await teacherModel.findOne({email});
            if(teacher){
                return res.json({
                    message:"teacher already exist"
                })
            }
            
            const data = new teacherModel({
                name,
                email,
                subject,
              
            })
            await data.save();
            return res.status(201).json({
                message:"teacher created successfully"
            })
        } catch (error) {
            return res.json({
                message:error.message
            })
        }
    },



    //for all user
    getAll:async(req,res)=>{
        const {pageNo} = req.params;
        try {
            if(pageNo<1){
                return res.json({
                    message:"page will started from 1"
                })
            }
            const data = await teacherModel.find({});
            const totaldata = data.length+1;
            const totalPage = Math.floor(totaldata/3);
            const integerNo = parseInt(pageNo)
            const resdata = await teacherModel.find({}).skip((integerNo-1)*3).limit(3);
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


    //for admin and teacher
    getById:async(req,res)=>{
        const {teacherId} = req.params;
        try {
            const data = await teacherModel.findOne({_id:teacherId});

            return res.status(200).json(data)
            

          } catch (error) {
            return res.json({
                message:error.message
            })
          }
    },


    //by admin
    updateTeacher:async(req,res)=>{
        const {name,email,subject} = req.body;
        const {teacherId} = req.params;
        try {
            await studentModel.updateOne({_id:teacherId},{name,email,subject});

            return res.json({
                 message:"student updated successfully"
            })
            

          } catch (error) {
            return res.json({
                message:error.message
            })
          }
    },
    

    
    //for only teacher
    uploadProfileImage:async(req,res)=>{
        const {teacherId} = req.params;
        const {url} = req.body
        const file = req.files.profileImage;
        try {
            if(url){
                const arr = url.split("/")
                const lastItem = arr[arr.length-1]
                const deleteImage = lastItem.split(".")[0];
                const deleteExistImage = await cloudinary.uploader.destroy(deleteImage);
            }
            const upload = await cloudinary.uploader.upload(file.tempFilePath);
            await teacherModel.updateOne({_id:teacherId},{profileImageUrl:upload.url});
            
            return res.json({
                message:"profile image updated"
            })


        } catch (error) {
            return res.json({
                message:error.message
            }) 
        }
    },




    //for only admin
    deleteTeacher:async(req,res)=>{
        const {teacherId,url} = req.params;
        try {
            if(url){
                const arr = url.split("/")
                const lastItem = arr[arr.length-1]
                const deleteImage = lastItem.split(".")[0];
                const deleteExistImage = await cloudinary.uploader.destroy(deleteImage);
            }
            await teacherModel.deleteOne({_id:teacherId});

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

module.exports = teacher;
const classModel = require("../model/class");

const classes = {

    
    //get all classes
    getAll:async(req,res)=>{
        const {pageNo} = req.params;
     try {
        if(pageNo<1){
            return res.json({
                message:"page will started from 1"
            })
        }
        const data = await classModel.find({});
        const totaldata = data.length+1;
        const totalPage = Math.floor(totaldata/3) ;
        const integerNo = parseInt(pageNo)
        const resdata = await classModel.find({}).skip((integerNo-1)*3).limit(3);
        return res.json({
            currentPage:pageNo,
            pageData:resdata,
            nextPage:(integerNo==totalPage)?"no page":integerNo+1,
            previousPage:(pageNo==1)?"no page":integerNo-1,
            totalPage:totalPage
        })

     } catch (error) {
        res.json({
            message:error.message
        })
     }
    },




    //get single class by id
    getById:async(req,res)=>{
        const {classId} = req.params;
        try {
         
            const data = await classModel.findOne({_id:classId});
            return res.json(data)
    
         } catch (error) {
            res.json({
                message:error.message
            })
         }
    },




    //create a new class
    create:async(req,res)=>{
        const {name,teacherId} = req.body;
        try {
         
            const data = new classModel({
                name,
                teacherId
            });
            await data.save();
            return res.status(201).json({
                message:"New class created"
            })
    
         } catch (error) {
            res.json({
                message:error.message
            })
         }  
     },




     //assign teacher
     assignTeacher:async(req,res)=>{
        const {teacherId} = req.body;
        const {classId} = req.params;
        try {
         
            await classModel.updateOne({_id:classId},{teacherId});
            return res.status(200).json({
                message:"assign a new teacher"
            })
    
         } catch (error) {
            res.json({
                message:error.message
            })
         }  
     },




     //update class
     updateClass:async(req,res)=>{
        const {name,teacherId} = req.body;
        const {classId} = req.params;
        try {
         
            await classModel.updateOne({_id:classId},{name,teacherId});
            return res.status(200).json({
                message:"class updated successfully"
            })
    
         } catch (error) {
            res.json({
                message:error.message
            })
         }  
     },



     //delete class
     deleteClass:async(req,res)=>{
        const {classId} = req.params;
        try {
         
            await classModel.deleteOne({_id:classId});
            return res.status(200).json({
                message:"class deleted succuessfully"
            })
    
         } catch (error) {
            res.json({
                message:error.message
            })
         }  
     }






}

module.exports = classes;
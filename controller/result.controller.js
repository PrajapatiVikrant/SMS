const resultModel = require("../model/result");


const result = {

    //create exam
    create: async (req, res) => {
        const { date,examId, classId, className,studentId, studentName,totalQuestion, maxNo, score } = req.body
        try {
            const data = new resultModel({
                date,
                examId,
                classId,
                className,
                studentId,
                studentName,
                totalQuestion,
                maxNo,
                score
            });

            await data.save();

            return res.json({
                message: "Result created successfully"
            })

        } catch (error) {
            return res.json({
                message: error.message
            })
        }

    },


    //get all exam
    getAll: async (req, res) => {
        try {
            const data = await resultModel.find({});
            return res.json(data);
        } catch (error) {
            return res.json({
                message: error.message
            })
        }
    },


    //get single exam by exam id
    getSingleResult: async (req, res) => {
        const {resultId} = req.params;
        try {
            const data = await resultModel.findOne({_id:resultId})
            return res.json(data);
        } catch (error) {
            return res.json({
                message: error.message
            }) 
        }

    },


    //update exam by exam id
    update: async (req, res) => {
        const {resultId} = req.params;
        const { date, classId, className,studentId, studentName,totalQuestion, maxNo, score } = req.body
        try {
            const data = await resultModel.updateOne({_id:resultId},{ date, classId, className,studentId, studentName,totalQuestion, maxNo, score});
            return res.json({
                message:"Result updated successfully"
            });
        } catch (error) {
            return res.json({
                message: error.message
            }) 
        }
    },


    //delete exam by exam id
    delete: async (req, res) => {
        const {resultId} = req.params;
        try {
            const data = await resultModel.deleteOne({_id:resultId})
            return res.json({
                message:"Result deleted successfully"
            });
        } catch (error) {
            return res.json({
                message: error.message
            }) 
        }
    }


}

module.exports = result;
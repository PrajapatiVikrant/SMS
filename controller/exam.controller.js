const examModel = require("../model/exam");

const exam = {

    //create exam
    create: async (req, res) => {
        const { date, classId, className, totalQuestion, maxNo, duration } = req.body
        try {
            const data = new examModel({
                date,
                classId,
                className,
                totalQuestion,
                maxNo,
                duration
            });

            await data.save();

            return res.json({
                message: "Exam created successfully"
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
            const data = await examModel.find({});
            return res.json(data);
        } catch (error) {
            return res.json({
                message: error.message
            })
        }
    },


    //get single exam by exam id
    getSingleExam: async (req, res) => {
        const {examId} = req.params;
        try {
            const data = await examModel.findOne({_id:examId})
            return res.json(data);
        } catch (error) {
            return res.json({
                message: error.message
            }) 
        }

    },


    //update exam by exam id
    update: async (req, res) => {
        const {examId} = req.params;
        const { date, classId, className, totalQuestion, maxNo, duration } = req.body
        try {
            const data = await examModel.updateOne({_id:examId},{date,classId,className,totalQuestion,maxNo,duration});
            return res.json({
                message:"Exam updated successfully"
            });
        } catch (error) {
            return res.json({
                message: error.message
            }) 
        }
    },


    //delete exam by exam id
    delete: async (req, res) => {
        const {examId} = req.params;
        try {
            const data = await examModel.deleteOne({_id:examId})
            return res.json({
                message:"Exam deleted successfully"
            });
        } catch (error) {
            return res.json({
                message: error.message
            }) 
        }
    }


}

module.exports = exam;
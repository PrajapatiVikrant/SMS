const attendanceModel = require("../model/attendance");


const attendance = {

    addAttendance: async (req, res) => {
        const { date, status, studentId,classId } = req.body;
        try {
            const data = new attendanceModel({
                date,
                status,
                studentId,
                classId
            })
            await data.save();
            res.json({
                message: "attendance add successully"
            })
        } catch (error) {
            res.json({
                message: error.message
            })
        }
    },

    getAll: async (req, res) => {
        const {classId} = req.params;
        try {

            const data = await attendanceModel.find({classId});
            return res.json(data)

        } catch (error) {
            res.json({
                message: error.message
            })
        }
    },

    getInDate: async (req, res) => {
        const {date,classId} = req.params;
        try {

            const data = await attendanceModel.find({date:date});
            return res.json(data)

        } catch (error) {
            res.json({
                message: error.message
            })
        }
    },

    getSingleStudentInDate: async (req, res) => {
        const {classId, date, studentId} = req.params;
        try {

            const data = await attendanceModel.findOne({date,studentId,classId});
            if(!data){
                return res.json({
                    message:"not found"
                })
            }
            return res.json(data)

        } catch (error) {
            res.json({
                message: error.message
            })
        }
    }
}

module.exports = attendance;
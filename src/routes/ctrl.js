
const user = require('../models/User');
const teacher = require('../models/Teacher');

const userProcess = {
    certifyMail: async (req, res) => {
        const response = await user.certifyMail(req.body);
        return res.json(response);
    },
    checkMailCode: async (req, res) => {
        const response = await user.checkMailCode(req.body);
        return res.json(response);
    },
    checkValidMail: async (req, res) => {
        const response = await user.checkValidMail(req.body);
        return res.json(response);
    },
    getStudentQuestionList: async (req, res) => {
        const response = await user.getStudentQuestionList();
        return res.json(response);
    },
    getParentQuestionList: async (req, res) => {
        const response = await user.getParentQuestionList();
        return res.json(response);
    },
    studentApplyRequest: async (req, res) => {
        const response = await user.studentApplyRequest(req.body);
        return res.json(response);
    },
    parentApplyRequest: async (req, res) => {
        const response = await user.parentApplyRequest(req.body);
        return res.json(response);
    },
    getUserRequestList: async (req, res) => {
        const response = await user.getUserRequestList(req.body);
        return res.json(response);
    },
    
}


const teacherProcess = {
    getTeacherRequestList: async (req, res) => {
        const response = await teacher.getTeacherRequestList(req.body);
        return res.json(response);
    },
    acceptTeacher: async (req, res) => {
        const response = await teacher.acceptTeacher(req.body);
        return res.json(response);
    },
    cancelRequest: async (req, res) => {
        const response = await teacher.cancelRequest(req.body);
        return res.json(response);
    }
}


module.exports = {
    userProcess,
    teacherProcess
};
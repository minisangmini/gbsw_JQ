const express = require('express');
const router = express.Router();

const ctrl = require('./ctrl');

router.post('/mail/certify', ctrl.userProcess.certifyMail);
router.post('/mail/checkCode', ctrl.userProcess.checkMailCode);
router.post('/mail/checkValid', ctrl.userProcess.checkValidMail);

router.get('/get/studentQuestionList', ctrl.userProcess.getStudentQuestionList);
router.get('/get/parentQuestionList', ctrl.userProcess.getParentQuestionList);
router.post('/get/userRequestList', ctrl.userProcess.getUserRequestList);
router.get('/get/teacherRequestList', ctrl.teacherProcess.getTeacherRequestList);

router.post('/request/studentApply', ctrl.userProcess.studentApplyRequest);
router.post('/request/parentApply', ctrl.userProcess.parentApplyRequest);
router.post('/request/accept', ctrl.teacherProcess.acceptTeacher)
router.post('/request/cancel', ctrl.teacherProcess.cancelRequest)



module.exports = router;
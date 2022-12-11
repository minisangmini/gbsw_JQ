const teacherStorage = require("./TeacherStorage");

class Teacher {
  // 상담신청 수락
  static async acceptTeacher(info) {
    try {
      const response = await teacherStorage.acceptTeacher(info);
      return response;
    } catch (err) {
      return { success: false, errorCode: 1 };
    }
  }

  // 상당 거절
  static async cancelRequest(no) {
    try {
      const response = await teacherStorage.cancelRequest(no);
      return response;
    } catch (err) {
      return { success: false, errorCode: 1 };
    }
  }

  // 상담신청 기록 가져오기
  static async getTeacherRequestList() {
    try {
      const response = {};

      response.waiting = await teacherStorage.getRequestList("waiting");
      response.success = await teacherStorage.getRequestList("success");
      response.deny = await teacherStorage.getRequestList("deny");

      return { success: true, data: response };
    } catch (err) {
      return { success: false, errorCode: 1 };
    }
  }
}

module.exports = Teacher;
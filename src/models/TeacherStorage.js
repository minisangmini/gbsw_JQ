const db = require("../config/db.js");

class teacherStorage {
  static acceptTeacher(info) {
    return new Promise((resolve, reject) => {
      const query =
        "UPDATE request_list SET status=?, teacher_suggest=? WHERE no=?;";
      db.query(query, [info.status, info.teacherSuggest, info.no], (err) => {
        if (err) reject(err);
        resolve({ success: true });
      });
    });
  }

  static cancelRequest(no) {
    return new Promise((resolve, reject) => {
      const query = "UPDATE requelst_list SET status=? WHERE no=?;";
      db.query(query, ["deny", no], (err) => {
        if (err) reject(err);
        resolve({ success: true });
      });
    });
  }

  static getRequestList(status) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM request_lis WHERE status=?;";
      db.query(query, [status], (err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });
  }
}

module.exports = teacherStorage;

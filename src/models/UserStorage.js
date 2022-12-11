const db = require("../config/db.js");

class UserStorage {
  static checkMail(mail) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM mail_list WHERE mail=?;";
      db.query(query, [mail], (err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });
  }

  static saveMail(mail) {
    return new Promise((resolve, reject) => {
      const query = "INSERT INTO mail_list(mail) VALUES(?);";
      db.query(query, [mail], (err) => {
        if (err) reject(err);
        resolve({ success: true });
      });
    });
  }

  static studentApplyRequest(info) {
    return new Promise((resolve, reject) => {
      const query =
        "INSERT INTO request_list(status, type, date, time, student_name, student_number, phone, mail, is_parent) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)";
      db.query(
        query,
        [
          "waiting",
          info.type,
          info.date,
          info.time,
          info.studentName,
          info.studentNumber,
          info.phone,
          info.mail,
          info.isParent,
        ],
        (err) => {
          if (err) reject(err);
          resolve({ success: true });
        }
      );
    });
  }

  static parentApplyRequest(info) {
    return new Promise((resolve, reject) => {
      const query =
        "INSERT INTO request_list(status, type, date, time, student_name, student_number, phone, mail, is_parent, parent_name, parent_where) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
      db.query(
        query,
        [
          "waiting",
          info.type,
          info.date,
          info.time,
          info.studentName,
          info.studentNumber,
          info.phone,
          info.mail,
          info.isParent,
          info.parentName,
          info.parentWhere,
        ],
        (err) => {
          if (err) reject(err);
          resolve({ success: true });
        }
      );
    });
  }

  static getUserRequestList(info, status) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM request_list WHERE mail=? AND status=?;";
      db.query(query, [info.mail, status], (err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });
  }
}

module.exports = UserStorage;

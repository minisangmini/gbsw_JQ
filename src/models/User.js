const userStorage = require("./UserStorage");
const nodemailer = require("nodemailer");

let maildb = [];

class User {
  // 메일 인증 코드 보내기
  static certifyMail(client) {
    for (let mailInfo of maildb) {
      if (Object.values(mailInfo).includes(client.mail))
        return { success: false, errorCode: 1 };
    }

    const mailCode = Math.floor(
      Math.random().toString().substr(2, 6)
    ).toString();
    const email = {
      service: "gmail",
      host: "smtp.gmail.com",
      port: 2525,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "si2841523@gmail.com",
        pass: "vwjmqahivfddpjwj",
      },
    };
    const opt = {
      from: "si2841523@gmail.com",
      to: client.mail,
      subject: "GBSW_JQ 인증번호가 도착했습니다!",
      html: `
            <div style=" text-align: center;
            margin: 15% 35%;">
            <h1 style="color: rgb(3, 66, 82);">Logo</h1>
            <hr/>
            <h2 style="color: rgb(3, 66, 82);">GBSW_JQ에서 인증번호가 도착했어요!</h2>
            <div style="text-align: left;
            margin-bottom: 10px;
            color: rgb(3, 66, 82);">다음 인증번호를 통해 회원가입을 하세요:</div>
            <div style="
            width: 100%;
            height: 50px;
            background-color: #00FFBF;
            text-align: center;">
              <label style="
              font-size: 30px;
              font-weight: 550;
              color: rgb(3, 66, 82);">${mailCode}</label>
            </div>
            <hr style="margin-top: 10%;"/>
            <div style="color: rgb(3, 66, 82);">
              <label>회원가입을 시도한 적이 없다면 무시해주세요<br/>만약 회원가입이 안될 경우 다시 시도 하거나 <br/>고객센터에 문의해주세요</label>
            </div>
            <hr/>
            </div>`,
    };

    try {
      return new Promise((resolve, reject) => {
        nodemailer.createTransport(email).sendMail(opt, (err, info) => {
          if (err) reject(err);

          maildb.push({ mail: client.mail, mailCode: mailCode });

          // 5분 지나면 메일 인증 만료
          setTimeout(() => {
            maildb.splice(maildb.length - 1, 1);
          }, 300000);

          resolve({ success: true });
        });
      });
    } catch (err) {
      return { success: false, errorCode: 2 };
    }
  }

  // 메일 인증 코드 확인
  static async checkMailCode(client) {
    for (let mailInfo of maildb) {
      if (Object.values(mailInfo).includes(client.mail)) {
        if (mailInfo.mailCode === client.mailCode) {
          // 메일 인증 완료
          maildb.splice(maildb.indexOf(client), 1);

          const check = await this.checkFirstMail(client.mail);

          if (check.success) {
            if (check.first) await userStorage.saveMail(client.mail);
          } else return { success: false, errorCode: 5 };

          return { success: true };
        }

        // 인증 코드 틀림
        return { success: false, errorCode: 4 };
      }
    }

    // 메일 인증 시간 지남
    return { success: false, errorCode: 3 };
  }

  // 최초 가입자, 재가입자 체크
  static async checkFirstMail(mail) {
    try {
      const response = await userStorage.checkMail(mail);

      // 재가입
      if (response.length === 1) return { success: true, first: false };

      // 최초 가입
      return { success: true, first: true };
    } catch (e) {
      return { success: false };
    }
  }

  // 유효한 메일인 지 체크
  static async checkValidMail(client) {
    try {
      const response = await userStorage.checkMail(client.mail);

      if (response.length === 1) return { success: true };
      return { success: false, errorCode: 7 };
    } catch (err) {
      return { success: false, errorCode: 6 };
    }
  }

  // 학생 질문 리스트 주기
  static async getStudentQuestionList() {
    const questionList = [
      {
        title: "어떤 상담을 원하시나요?",
        key: "type",
        questions: [
          { question: "진로", type: "select" },
          { question: "진학", type: "select" },
          { question: "기타", type: "input" },
        ],
      },
      {
        title: "원하는 상담 날짜를 선택해주세요",
        key: "date",
        questions: [{ question: "날짜", type: "date" }],
      },
      {
        title: "원하는 상담 시간을 선택해주세요",
        key: "time",
        questions: [
          { question: "점심시간", type: "select" },
          { question: "저녁시간", type: "select" },
          { question: "야자시간", type: "select" },
          { question: "기타", type: "input" },
        ],
      },
      {
        title: "이름을 입력해주세요",
        key: "studentName",
        questions: [{ question: "이름", type: "input" }],
      },
      {
        title: "학번을 입력해주세요",
        key: "studentNumber",
        questions: [{ question: "학번", type: "input" }],
      },
      {
        title: "전화번호를 입력해주세요",
        key: "phone",
        questions: [{ question: "전화번호", type: "input" }],
      },
    ];

    return questionList;
  }

  // 부모님 질문지 가져오기
  static getParentQuestionList() {
    const questionList = [
      {
        title: "어떤 상담을 원하시나요?",
        key: "type",
        questions: [
          { question: "진로", type: "select" },
          { question: "진학", type: "select" },
          { question: "기타", type: "input" },
        ],
      },
      {
        title: "어떤 상담 방법을 원하시나요?",
        key: "parentWhere",
        questions: [
          { question: "전화 상담", type: "select" },
          { question: "대면 상담", type: "select" },
        ],
      },
      {
        title: "원하는 상담 날짜를 선택해주세요",
        key: "date",
        questions: [{ question: "날짜", type: "date" }],
      },
      {
        title: "원하는 상담 시간을 입력해주세요",
        key: "time",
        questions: [{ question: "상담 시간", type: "input" }],
      },
      {
        title: "자녀의 이름을 입력해주세요.",
        key: "studentName",
        questions: [{ question: "이름", type: "input" }],
      },
      {
        title: "자녀의 학번을 입력해주세요.",
        key: "studentNumber",
        questions: [{ question: "학번", type: "input" }],
      },
      {
        title: "학부모님의 이름을 적어주세요",
        key: "parentName",
        questions: [{ question: "이름", type: "input" }],
      },
      {
        title: "학부모님의 전화번호를 적어주세요",
        key: "phone",
        questions: [{ question: "전화번호", type: "input" }],
      },
    ];

    return questionList;
  }

  // 학생이 선생님에게 상담 신청
  static async studentApplyRequest(info) {
    const checkTitle = await this.getStudentQuestionList();
    const data = {};
    data.mail = info["__email__"];
    data.isParent = 0;

    checkTitle.filter((item) => {
      for (const key of Object.keys(info)) {
        if (item.title === key) {
          data[item.key] = info[key];
        }
      }
    });

    try {
      const response = await userStorage.studentApplyRequest(data);
      return response;
    } catch (err) {
      return { success: false, errorCode: 1 };
    }
  }

  // 부모님이 선생님에게 상담 신청
  static async parentApplyRequest(info) {
    const checkTitle = this.getParentQuestionList();
    const data = {};
    data.mail = info["__email__"];
    data.isParent = 1;

    checkTitle.filter((item) => {
      for (const key of Object.keys(info)) {
        if (item.title === key) {
          data[item.key] = info[key];
        }
      }
    });

    try {
      const response = await userStorage.parentApplyRequest(data);
      return response;
    } catch (err) {
      return { success: false, errorCode: 1 };
    }
  }

  // 학생이 자신의 기록 가져오기
  static async getUserRequestList(info) {
    try {
      const response = {};

      response.waiting = await userStorage.getUserRequestList(info, "waiting");
      response.success = await userStorage.getUserRequestList(info, "success");
      response.deny = await userStorage.getUserRequestList(info, "deny");

      return { success: true, data: response };
    } catch (err) {
      return { success: false, errorCode: 1 };
    }
  }
}

module.exports = User;

const db = require("../common/connect");

const Student = function (student) {
  this.username = student.username;
  this.password = student.password;
  this.role = student.role;
};

Student.login = function (data, result) {
  const param = [data.username, data.password];
  try {
    db.query(
      "SELECT username, role, id, address  from student where username = ? && password = ?",
      param,
      function (err, data) {
        if (err) {
          result(err);
        } else {
          if (data.length > 0)
            result({
              status: 200,
              data,
            });
          else
            result({
              status: 401,
              message: "Invalid username or password",
            });
        }
      }
    );
  } catch (error) {
    console.log("co loi");
  }
};

Student.getAll = function (result) {
  try {
    db.query(
      "SELECT code, name, birthday, address  from student ",
      function (err, data) {
        if (err) {
          return result(err);
        } else {
          return result(data);
        }
      }
    );
  } catch (error) {
    console.log("co loi");
  }
};

Student.getById = function (id, result) {
  try {
    db.query(
      `SELECT code, name, birthday, address  from student where id = ${id}`,
      function (err, data) {
        if (err) {
          result(err);
        } else {
          result(data);
        }
      }
    );
  } catch (error) {
    console.log("co loi");
  }
};

Student.returnById = function (id) {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT code, name, birthday, address FROM student WHERE id = ${id}`,
      function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data[0]);
        }
      }
    );
  });
};

Student.getByProjectId = async function (id, result) {
  try {
    // const data = await new Promise((resolve, reject) => {
    //   db.query(
    //     `SELECT studentid FROM studentinproject WHERE projectid = ${id}`,
    //     function (err, data) {
    //       if (err) {
    //         reject(err);
    //       } else {
    //         resolve(data);
    //       }
    //     }
    //   );
    // });

    const data = await new Promise((resolve, reject) => {
      db.query(
        `select studentinproject.id AS stdinprjId,StudentId,CODE, student.Name, student.BirthDay, student.Address from student, studentinproject where student.Id = studentinproject.StudentId AND studentinproject.ProjectId = ${id}`,
        function (err, data) {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        }
      );
    });

    // for (let i = 0; i < data.length; i++) {
    //   const student = await Student.returnById(data[i].studentid);
    //   dataStudent.push(student);
    // }

    result(data);
  } catch (error) {
    console.log(error);
  }
};

Student.getByCourseId = async function (id, result) {
  try {
    const data = await new Promise((resolve, reject) => {
      const quere = `SELECT code,name, birthday, address FROM student , studentincourse WHERE studentincourse.courseId = ${id} and student.Id = studentincourse.StudentId`;
      db.query(quere, function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
    result(data);
  } catch (error) {
    result(error);
  }
};

Student.checkDoubleUser = (username) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM Student WHERE username = ?";
    db.query(query, [username], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

Student.checkDoubleCode = (code) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM Student WHERE code = ?";
    db.query(query, [code], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

Student.add = async function (data, result) {
  try {
    // Truy vấn để kiểm tra trùng lặp người dùng
    const duplicateUsers = await Student.checkDoubleUser(data.username);
    const duplicateCode = await Student.checkDoubleCode(data.code);

    if (duplicateUsers.length > 0) {
      return result({ status: 401, message: "Duplicate username" });
    }
    if (duplicateCode.length > 0) {
      return result({ status: 401, message: "Duplicate code" });
    } else {
      // Tiếp tục thực hiện truy vấn thêm sinh viên vào cơ sở dữ liệu
      const insertQuery = `INSERT INTO student (code, name, birthday, address, username, password, role) VALUES (?, ?, ?, ?, ?, ?, "std")`;
      db.query(
        insertQuery,
        [
          data.code,
          data.name,
          data.birthday,
          data.address,
          data.username,
          data.password,
        ],
        (error, insertResult) => {
          if (error) {
            return result({ status: 500, message: "Failed to insert student" });
          } else {
            return result({ status: 200, message: "Insert student success" });
          }
        }
      );
    }
  } catch (error) {
    console.log(error);
    return result({ status: 500, message: "Internal server error" });
  }
};

module.exports = Student;

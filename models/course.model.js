const db = require("../common/connect");

const Course = function (course) {
  this.id = course.id;
  this.subjectId = course.subjectId;
  this.semesterId = course.semesterId;
  this.LectureId = course.LectureId;
};

Course.getBySubject = function (id, cb) {
  try {
    db.query(
      "select * from Course where SubjectId = ?",
      [id],
      function (err, result) {
        if (err) {
          return cb(err);
        }
        return cb(result);
      }
    );
  } catch (error) {}
};

Course.getByID = function (id, cb) {
  try {
    db.query("select * from course where id = ?", [id], function (err, result) {
      if (err) {
        return cb(err);
      }
      return cb(result);
    });
  } catch (error) {
    cb(error);
  }
};

Course.getAll = function (cb) {
  try {
    db.query("SELECT * FROM Course", function (err, data) {
      if (err) return cb(err);
      return cb(data);
    });
  } catch (error) {
    cb(error);
  }
};

Course.getByStuentID = function (id, cb) {
  try {
    db.query(
      `SELECT * from studentincourse, course where studentincourse.CourseId = course.Id AND studentincourse.StudentId = ${id};`,
      function (err, data) {
        if (err) return cb(err);
        return cb(data);
      }
    );
  } catch (error) {
    cb(error);
  }
};

Course.getByTeacherID = function (id, cb) {
  try {
    db.query(
      `SELECT * from course,lecture where lecture.id = ${id} AND lecture.id = course.LectureId;`,
      function (err, data) {
        if (err) return cb(err);
        return cb(data);
      }
    );
  } catch (error) {
    cb(error);
  }
};

Course.add = function (data, cb) {
  try {
    const { subjectId, semesterId, name, LectureId, id } = data;

    db.query(
      `insert into course (subjectId, semesterId, LectureId, name) values (${subjectId},${semesterId},${LectureId},"${name}")`,
      function (err, data) {
        if (err)
          return cb({
            status: 401,
            message: "Insert failed",
          });
        return cb({
          status: 200,
          message: "Insert succeeded",
        });
      }
    );
  } catch (error) {
    return cb({
      status: 401,
      message: "Error inserting",
    });
  }
};
module.exports = Course;

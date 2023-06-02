const db = require("../common/connect");

const Score = function (Score) {
  (this.courseId = Score.courseId),
    (this.StudentInProjectId = Score.StudentInProjectId),
    (this.LectureInBoardId = Score.LectureInBoardId),
    (this.LectureInBoardId = Score.LectureInBoardId),
    (this.score = Score.score);
};

Score.insertScore = function (dataScores, data, cb) {
  try {
    for(let key in dataScores) {
      let dataMake = [...data];
      dataMake[dataMake.length] = key;
      dataMake[dataMake.length] = dataScores[key];
      db.query(
        "INSERT INTO score (CourseId, StudentInProjectId, LectureInBoardId, ScoreColumnId, score) VALUES (?,?,?,?,?)",
        dataMake,
        (err, result) => {
          if (err) {
            cb(err);
          } 
        }
      );
    }
    cb("thanh cong")

  } catch (error) {
    cb(error);
  }
};

Score.getScore = function (id,cb) {
  try {
    const idStdiInPrj = id[0].id
    console.log(idStdiInPrj)
    db.query(`SELECT * from score where StudentInProjectId = ${idStdiInPrj}`, (err, result) => {
      if (err) cb(err);
       cb(result);
    })
  } catch (error) {
    cb(error);
  }
}

module.exports = Score;

module.exports= function(router) {
    const teacherController = require('../controllers/teacher.controller');

    router.get('/teacher/getall', teacherController.getAll);
    router.get('/teacher/:lectureInBoard/linb', teacherController.getByLectureInBoard);
    router.get('/teacher/courAndStd', teacherController.getByStdIdAndCourId);
    // router.get('/student/:project/project', teacherController.getByProjectId);
    // router.get('/student/:course/course', teacherController.getByCourseId);
    // router.get('/student/:student/student', teacherController.getById);
}
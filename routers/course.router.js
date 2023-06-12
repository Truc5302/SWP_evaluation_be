module.exports = function(router) {
    const courseController = require('../controllers/course.controller');

    router.get('/course/:student/student', courseController.getByStudentID);
    router.get('/course/:teacher/teacher', courseController.getByTeacherID);
    router.post('/course/add', courseController.add);
    router.get('/course/getall', courseController.getAll);
}
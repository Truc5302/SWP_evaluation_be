
module.exports = function(router) {
    const scoreColumn = require('../controllers/scoreColumn.controller'); 

    router.get('/scorecolumn/:template/subject', scoreColumn.getByTemplateId);
    router.get('/scorecolumn/:template', scoreColumn.getByTemplateId);
    
}
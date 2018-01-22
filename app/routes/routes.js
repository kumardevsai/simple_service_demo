module.exports = function(app) {

    var project = require('../controllers/projects_controller.js');

     app.get('/', project.findAll);

    // Create a new Project
    app.post('/projects', project.create);

    // Retrieve all Project
    app.get('/projects', project.findAll);

    // Retrieve a single Note with projectId
    app.get('/project/:id', project.findOne);


    // Update a Note with projectId
    app.put('/project/:id', project.update);

    // Delete a Note with projectId
    app.delete('/project/:id', project.delete);
}
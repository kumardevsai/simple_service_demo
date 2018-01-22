var Project = require('../models/project.js');

// Create and Save a new Project
exports.create = function(req, res) {
    if(!req.body.description) {
        res.status(400).send({message: "Project can not be empty"});
    }
    var project = new Project({name: req.body.name || "Untitled Project", description: req.body.description});
    
    project.save(function(err, data) {
        console.log(data);
        if(err) {
            console.log(err);
            res.status(500).send({message: "Some error occurred while creating the Project."});
        } else {
            res.send(data);
        }
    });
};

 // Retrieve and return all projects from the database.
exports.findAll = function(req, res) {
    Project.find(function(err, project){
        if(err) {
            res.status(500).send({message: "Some error occurred while retrieving projects."});
        } else {
            res.send(project);
        }
    });
};

   //Find a single note with a projectID
exports.findOne = function(req, res) {
    Project.findById(req.params.id, function(err, data) {
        if(err) {
            res.status(500).send({message: "Could not retrieve note with id " + req.params.id});
        } else {
            res.send(data);
        }
    });
};

 // Update a note identified by the noteId in the request
exports.update = function(req, res) {
    Project.findById(req.params.id, function(err, project) {
        if(err) {
            res.status(500).send({message: "Could not find a project with id " + req.params.id});
        }

        project.name = req.body.name;
        project.description = req.body.description;

        project.save(function(err, data){
            if(err) {
                res.status(500).send({message: "Could not update project with id " + req.params.id});
            } else {
                res.send(data);
            }
        });
    });
};

 // Delete a project with the specified projectId in the request
exports.delete = function(req, res) {
    Project.remove({_id: req.params.id}, function(err, data) {
        if(err) {
            res.status(500).send({message: "Could not delete project with id " + req.params.id});
        } else {
            res.send({message: "Project deleted successfully!"})
        }
    });
};


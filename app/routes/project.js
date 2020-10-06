// set up express router
const router = require('express').Router();

// project model
let Projects = require('../models/project.model');

// get
router.route('/').get((req, res) => {
    // Finds and displays all projects
    Projects.find()
        .then(projects => res.json(projects))
        .catch(err => res.status(400).json('Error(get all projects): ' + err));
});

// add new
router.route('/add').post((req, res) => {
    // pull in values from request body
    const ProjectType = String(req.body.ProjectType);
    const PlaceName = String(req.body.PlaceName);
    const Latitude = Number(req.body.Latitude);
    const Longitude = Number(req.body.Longitude);
    const ProjectDescription = String(req.body.ProjectDescription);
    const FunFact = String(req.body.FunFact);
    const FishType = String(req.body.FishType);
    const ProjectUrl = String(req.body.ProjectUrl);
    const Year = Number(req.body.Year);

    // create new project
    // must give project obj variable names that correspond to its schema names
    const newProject = new Projects({
        ProjectType,
        PlaceName,
        Latitude,
        Longitude,
        ProjectDescription,
        FunFact,
        FishType,
        ProjectUrl,
        Year
    });

    newProject.save()
        .then(() => res.json('Project added!'))
        .catch(err => res.status(400).json('Error(Projects add new router): ' + err));
});

// edit (id passed in url)
router.route('/edit/:id').post((req, res) => {
    Projects.findById(req.params.id)
        .then(project => {
            console.log(req);
            project.ProjectType = req.body.ProjectType;
            project.PlaceName = req.body.PlaceName;
            project.Latitude = Number(req.body.Latitude);
            project.Longitude = Number(req.body.Longitude);
            project.ProjectDescription = req.body.ProjectDescription;
            project.FunFact = req.body.FunFact;
            project.FishType = req.body.FishType;
            project.ProjectUrl = req.body.ProjectUrl;
            project.Year = Number(req.body.Year);

            // save project
            project.save()
                .then(() => res.json('Project Successfully Updated'))
                .catch(err => res.status(400).json('Error(project update): ' + err));
        })
        .catch(err => res.status(400).json('Error(projects edit router): ' + err));
});


// delete
router.route('/:id').delete((req, res) => {
    Projects.findByIdAndDelete(req.params.id)
        .then(() => res.json('Project Successfully Deleted'))
        .catch(err => res.status(400).json('Error(delete project): ' + err));
});

// details
// find by id
router.route('/:id').get((req, res) => {
    Projects.findById(req.params.id)
        .then(project => res.json(project))
        .catch(err => res.status(400).json('Error(project details): ' + err));
});

// export router for use in server.js
module.exports = router;
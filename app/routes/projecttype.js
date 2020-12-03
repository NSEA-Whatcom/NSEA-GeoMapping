// set up exrpess router
const router = require('express').Router();

// require project type model
let ProjType = require('../models/projecttype.model');

// get
router.route('/').get((req, res) => {
    // get all projecttypes
    ProjType.find()
        .then(project => res.json(project))
        .catch(err => res.status(400).json('Error(get all project types): ' + err));
});

// add new fish type
router.route('/add').post((req, res) => {
    // get value from request body
    const ProjectType = String(req.body.ProjectType);

    // create new projecttype
    const newProject = new ProjType({
        ProjectType
    });

    // save projecttype to db
    newProject.save()
        .then(() => res.json('ProjectType added!'))
        .catch(err => res.status(400).json('Error(adding new project type): ' + err));
});

// delete projecttype
router.route('/:id').delete((req, res) => {
    ProjType.findByIdAndDelete(req.params.id)
        .then(() => res.json('ProjectType Deleted!'))
        .catch(err => res.status(400).json('Error(deleting project type): ' + err));
});

// export router
module.exports = router;
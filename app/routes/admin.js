// set up express router
const router = require('express').Router();
// admin model
let Admin = require('../models/admin.model');
// import signUp validation and helper functions
// import { signUp } from '../validations/admin';
const validations = require('../validations/admin');
// import { parseError, sessionizeUser } from '../util/helpers';
const helpers = require('../util/helpers');

// get login form
router.route('/').get((req, res) => {
    Admin.find()
        .then(admin => res.json(admin))
        .catch(err => res.status(400).json("Error(get admin): " + err))
});

// post new admin login
router.route('/').post((req, res) => {
    // extract values
    const Username = String(req.body.Username);
    const Password = String(req.body.Password);

    // validate
    const { error, value } = validations.signUp.validate({ Username, Password });

    // check for errors
    if (error != undefined) {
        console.log(error);
        throw new Error("object did not pass validation");
    }

    // create new admin object
    const newAdmin = new Admin({
        Username,
        Password
    });

    // sessionize user
    const sessionUser = helpers.sessionizeUser(newAdmin);

    // save new admin in DB
    newAdmin.save()
        .then(() => {
            req.session.user = sessionUser;
            console.log(req.session);
            res.send(sessionUser);
        })
        .catch(err => res.status(400).json('Error(Admin add new router): ' + helpers.parseError(err)));
});

module.exports = router;
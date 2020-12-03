const router = require('express').Router();
const Admin = require('../models/admin.model');
const mongoose = require('mongoose');
// import functions
const validations = require('../validations/admin');
// import { parseError, sessionizeUser } from '../util/helpers';
const helpers = require('../util/helpers');

// check if user is signed in
router.route("/").get((req, res) => {
    const admin = req.session.admin;
    console.log(req.session);
    res.send(admin);
});

// create session
router.route("/").post((req, res) => {
    // extract values
    const Username = String(req.body.Username);
    const Password = String(req.body.Password);

    // validate inputs
    const { error, value } = validations.signIn.validate({ Username, Password });

    // check for errors
    if (error != undefined) {
        console.log(error);
        throw new Error("object did not pass validation");
    }

    // find admin in DB
    Admin.findOne({ Username })
        .then((admin) => {
            // check that login is valid
            if (admin && admin.comparePasswords(Password)) {
                const sessionAdmin = helpers.sessionizeUser(admin);

                req.session.admin = sessionAdmin;
                req.session.save(() => {
                    res.send(sessionAdmin);
                });
            } else {
                throw new Error('Invalid login credentials');
            }
        })
        .catch(err => res.status(400).send(helpers.parseError(err)));
});

// delete session
router.route("/").delete((req, res) => {
    try {
        const admin = req.session;

        if (admin) {
            admin.destroy(err => {
                if (err) throw (err);
                res.clearCookie(process.env.SESS_NAME);
                res.send(admin);
            })
        } else {
            throw new Error('something went wrong');
        }
    } catch (err) {
        res.status(422).send(helpers.parseError(err));
    }
});

module.exports = router;
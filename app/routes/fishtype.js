// // set up exrpess router
// const router = require('express').Router();

// // require fishtype model
// let Fish = require('../models/fishtype.model');

// // get
// router.route('/').get((req, res) => {
//     // get all Fishtypes
//     Fish.find()
//         .then(fish => res.json(fish))
//         .catch(err => res.status(400).json('Error(get all fish types): ' + err));
// });

// // add new fish type
// router.route('/add').post((req, res) => {
//     // get value from request body
//     const FishType = String(req.body.FishType);

//     // create new fish type
//     const newFish = new Fish({
//         FishType
//     });

//     // save fish to db
//     newFish.save()
//         .then(() => res.json('Fish added!'))
//         .catch(err => res.status(400).json('Error(adding new fish): ' + err));
// });

// // delete fish type
// router.route('/:id').delete((req, res) => {
//     Fish.findByIdAndDelete(req.params.id)
//         .then(() => res.json('FishType Deleted!'))
//         .catch(err => res.status(400).json('Error(deleting fish): ' + err));
// });

// // export router
// module.exports = router;
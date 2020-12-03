// require mongoose
const mongoose = require('mongoose');

// mongoose schema class
const Schema = mongoose.Schema;

// Project Type Schema
const projectTypeSchema = new Schema({
    ProjectType: { type: String, trim: true, required: true }
});

// create mongoose model
const ProjType = mongoose.model('ProjectType', projectTypeSchema);

// export project type model
module.exports = ProjType;
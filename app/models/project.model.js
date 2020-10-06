// require mongoose
const mongoose = require('mongoose');

// mongoose schema class
const Schema = mongoose.Schema;

// project db schema
const projectSchema = new Schema({
    ProjectType: { type: String, required: true },
    PlaceName: { type: String, required: true },
    Latitude: { type: Number, required: true, trim: true },
    Longitude: { type: Number, required: true, trim: true },
    ProjectDescription: { type: String, required: true },
    ProjectUrl: { type: String, required: false, trim: true },
    Year: {type: Number, required: false}
    // FunFact: { type: String, required: true },
    // FishType: { type: String, required: true, trim: true },
});

// bind project var with schema
const Project = mongoose.model('Project', projectSchema);

// export project
module.exports = Project;
// requires axios, fs, and PapaParse
const axios = require('../client/node_modules/axios');
const fs = require('fs');
const jsonOut = './staged_projects.json';
const Papa = require('papaparse');


class DbUpdate {
    constructor(file) {
        this.csv = fs.readFileSync(file, 'utf-8').trim();
    }

    csvToJson() {
        let parsedCsv = Papa.parse(this.csv, {
            header: true,
        });

        return parsedCsv;
    }

    writeToJsonFile(outputFile = 'DbUpdate_Output.json', jsonToWrite = {}) {
        // stringify json
        let stringified = JSON.stringify(jsonToWrite, null, 4);

        fs.writeFileSync(outputFile, stringified, 'utf8', err => {
            if (err) {
                console.log('Error writing to file: ' + err);
            } else {
                console.log('Successfully wrote to file');
            }
        });
    }

    sendToDb(json) {
        json.data.forEach(obj => {
            const project = {
                ProjectType: obj.ProjectType,
                PlaceName: obj.PlaceName,
                Latitude: parseFloat(obj.Latitude),
                Longitude: parseFloat(obj.Longitude),
                ProjectDescription: obj.ProjectDescription,
                ProjectUrl: obj.ProjectUrl,
                Year: obj.Year
            }

            console.log(project);

            axios.post('http://localhost:5000/projects/add', project)
                .then(res => console.log(res.data))
                .catch(err => console.log('Error posting project: ' + err));
        });
    }

    deleteAllFromDb() {
        axios.get('http://localhost:5000/projects/')
            .then(res => {
                // loop response and delete all project data
                res.data.forEach(project => {
                    // delete from db
                    axios.delete('http://localhost:5000/projects/' + project._id)
                        .then(res => console.log(res.data))
                        .catch(err => console.log(err));
                });

                console.log('all records deleted');
            })
            .catch(err => console.log(err));
    }
}

csvToRead = 'project.txt';

const db = new DbUpdate(csvToRead);

let parsedCsv = db.csvToJson();

db.writeToJsonFile(jsonOut, parsedCsv);

db.sendToDb(parsedCsv);

// db.deleteAllFromDb();

module.exports = DbUpdate;

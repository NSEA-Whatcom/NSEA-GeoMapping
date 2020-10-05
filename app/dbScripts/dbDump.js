// import axios from 'axios';

const axios = require('../client/node_modules/axios');
const fs = require('fs');
const jsonOut = './staged_projects.json';
const Papa = require('papaparse');

// file name
let file = 'updated_project.txt';

// csv file
let csv = fs.readFileSync(file, 'utf8').trim();

/* 
    Functions
*/

// convert csv to json
function csvToJson(fileName){
    // console.log(fileName);
    let lines = fileName.split("\n");

    let result = [];

    // create headers line
    let headers = lines[0].split(',');
    console.log(headers);

    // loop through 
    for(let i = 1; i < lines.length; i++){
        let obj = {};

        let currLine = lines[i].split(',');

        for(let j = 0; j < headers.length; j++){
            obj[headers[j]] = currLine[j];
        }

        result.push(obj);
    }

    // convert to json and return
    return JSON.stringify(result, null, 4);
}

// parse csv using papapatse
function parseCsv(csv){
    let parsedCsv = Papa.parse(csv, {
       header: true, 
    });

    // console.log(parsedCsv.data);
    // let result = JSON.stringify(parsedCsv, null, 4);

    // return result;
    return parsedCsv;
}


// send to database
function sendToDb(json){

    // let bigObj = json["data"]
    // console.log(json.data);

    json.data.forEach(obj => {
        const project = {
            ProjectType: obj.ProjectType,
            PlaceName: obj.PlaceName,
            Latitude: parseFloat(obj.Latitude),
            Longitude: parseFloat(obj.Longitude),
            ProjectDescription: obj.ProjectDescription,
            ProjectUrl: obj.ProjectUrl,
        }
    
        console.log(project);
    
        axios.post('http://localhost:5000/projects/add', project)
            .then(res => console.log(res.data))
            .catch(err => console.log('Error posting project: ' + err));
    });
}

function deleteAllFromDb(){

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

/* 
    End Functions 
*/

let projectsJson = parseCsv(csv);

// console.log('projects parsed!');

// fs.writeFileSync(jsonOut, projectsJson, 'utf8', err => {
//     if (err){
//         console.log('Error writing to file: ' + err);
//     }else{
//         console.log('Successfully wrote to file');
//     }
// });

// console.log('wrote file');

// console.log(projectsJson);

sendToDb(projectsJson);

// deleteAllFromDb();
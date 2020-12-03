# Parse CSV into JSON to add json projects to MongoDB database
# Author: Zach Cooper
# Date: 22/5/20


# import helper modules
import csv, json

csvFilePath = 'project.txt'
jsonFilePath = 'staged_projects.json'

# create project_data dictionary
project_data = {}

# read csv file and add to project_data dict
with open(csvFilePath) as file:
    csvReader = csv.DictReader(file)
    for row in csvReader:
        id = row['ProjectType']
        project_data[id] = row

# write to project_data to json file
with open(jsonFilePath, 'w') as jsonFile:
    jsonFile.write(json.dumps(project_data, indent=4))
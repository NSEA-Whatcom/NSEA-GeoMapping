# Author: Zach Cooper
# Date: 24/5/20
# 

#####################
# Global header list
HEADER = []
HEADER.append('ProjectType')
HEADER.append('PlaceName')
HEADER.append('Latitude')
HEADER.append('Longitude')
HEADER.append('ProjectDescription')
HEADER.append('ProjectUrl')
#####################

csvFileName = 'project.txt'

csvFile = open(csvFileName, 'r')

projects_arr = []

for line in csvFile:
    line = line.strip('\n')
    line_list = line.split(',')

    project = {}

    for i in range(0, len(HEADER)):
        project[HEADER[i]] = str(line_list[i])

    projects_arr.append(project)

outputFile = open('output.txt', 'w')
outputFile.write(projects_arr)





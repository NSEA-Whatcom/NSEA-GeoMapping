# NSEA-GeoMapping Project
Interactive map for the Nooksack Salmon Enhancement Association primary website.

## Application 
To view project application, look under the app folder. 

## Documentation 
To view project documentation, look under the documentation folder. 

## Contributors
Zach Cooper Github: CooperZA (zach@raincitysolutions.com) Developer
Juniper Still Github: stillj2 (junistill@gmail.com) Designer
Taichen Rose Github: willsower (jatr812@gmail.com) Developer
Email for questions about the project or the codebase

## Application Setup
This application setup assumes you know the basics of using a bash terminal. Codeblocks below will be examples of what you would use in the terminal. If you don't know how to use a bash terminal, this guide will do it's best to make sure you have what you need.

### Step 1: Download Node.js and Git to your computer 
You can find this online.

### Step 2: Login to the NSEA-Whatcom github. 
You can find the Github credentials (login) in the documentation file that was sent to you.

### Step 3: Invite yourself as Contributor or continue using NSEA account
When logged into NSEA-Whatcom github, you can either continue to work on this project on that account, or make yourself a contributor. If you wish to make yourself a contributor, invite your own github to this project.

### Step 4: Clone this github repository to your local machine. 
````git clone https://github.com/NSEA-Whatcom/NSEA-GeoMapping.git````

### Step 5: Need to download node_modules to some files. 

Go into the app folder
````cd app````

Download node_modules
````npm install````

Go into app/client folder
````cd client````

Download node_moduels in that folder aswell
````npm install````

### Step 6: Connect to MongoDB and add in your IP address

Go to MongoDB on google. Login to it using NSEA's credentials. (You can find these crednetials in the documentation file that was sent to you.)

Once logged in, you'll be on a Clusters page. Look on the left navigation bar for "Network Access" 

Click on the Green "Add IP Address" button, then add in your ID address. (They have a button that will automatically input your current IP address, so you don't have to manually type it in).

### Step 7: Add your .env files

In your app file, create a file named .env
Paste in the 6 lines of code to this .env file. You can find the 6 lines of code in the documentation file that was sent to you.

In your app/client file, create a file named .env
Paste in the 2 lines of code to this .env file. You can find the 2 liens of code in the documentation file that was sent to you.

### Step 8: Run the project

You will need to open up 2 seperate terminals for this. Open a terminal in your app folder, then open a file in your app/client folder.

In the app folder, run the command ````nodemon server````
Note: If you get an error running the above command, try using  ````npx nodemon```` instead. If both don't work, double check to see if you have nodemon downloaded.

In the app/client folder, run the command ````npm start````
Note: If you get an error running the above command, delete the node_modules folder in app/client folder. Then reinstall them by typing in ````npm install````, then do ````npm start```` command.

When both your terminals have accepted the command inputs. A lcoalhost webrowser will show up in your search browser with the map.
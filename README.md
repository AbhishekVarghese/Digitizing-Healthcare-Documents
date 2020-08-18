# Digitizing-Healthcare-Documents

Developed for the finals of Smart India Hackathon 2019.

### Contributers (members of the team MohmAIa_200)

* Abhishek Varghese
* Gaurav Ganna
* Himali Goel
* Manika Khare
* Raj Hansani Khoiwal
* Shivam Kumar

#### Technology Stack

* MongoDb
* React Native
* Node.js
* Python
* Open Source - Google Tesseract OCR

### Steps to run the web application:

1. Initialize MongoDB database by running the script *'database_script.js'* in mongo shell using the following command:  
**load("path_to_script/database_script.js")**

1. Change IP address to your system's IP address in axios method in the following files located in the folder *'./myapp/client/src/components'*:
    * form.jsx
    * home.jsx
    * reactUploadImage.jsx
    * userView.jsx

1. Run the following command in *'myapp'* folder to start the server:  
**node index.js**

1. Run the following command in *'myapp/client'* folder to start the react client:  
**npm start**

1. Open http://localhost:3000 in a browser

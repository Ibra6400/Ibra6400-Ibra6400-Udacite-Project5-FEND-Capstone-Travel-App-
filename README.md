# FEND Capstone - Travel App
Travel App is to obtains a desired trip location & date from the user, and displays weather and an image of the location using information obtained from external APIs.

## Getting started
Fork, clone, or download this repo and begin your project setup.

After you clone, you have to install packages to run the app:

**Step 1: Signup for an API key**

  the app pull data from 3 APIs:
  - geonames API shows atitude, longitude and  country  sign up[here](http://www.geonames.org/export/web-services.html)
  * Weatherbit API shows daily and future weathe sign up [here](https://www.weatherbit.io/account/create)
  -  Pixabay API shows location image sign up [here](https://pixabay.com/api/docs/)
  
  
  **Step 2: Run the Project**:
  
First move to the project folder from terminal or cmd and type/install  
-npm i

  To run the project there are two modes development mode and production mode. to test the functions of the project there is test mode. the steps below shows how to run each mode
  
  **development mode**
  
To run the webpack dev server at port 8080
- npm run build-dev

**production mode**

- npm run build-prod to generate a dist folder for prod
- npm run start to run the server on port 8081
**test mode**
to pass all test the production mode should run first
- npm run test
  
## Dependencies
- HTML
- CSS
- Sass
- JavaScript
- Webpack
- Express
- Babel

## Note
-  geonames API is in the client side js/formHandler.js
-  Weatherbit API and Pixabay API is in the server side server/index.js
- using promise and promise.all() functions for pulling data from Weatherbit API and Pixabay API  to handle the respond
-  the app test the funcions, server expres and API fetching 

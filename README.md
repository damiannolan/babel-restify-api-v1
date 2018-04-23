# Babel Restify API for Facial Auth Services

This repository contains a [Node.js](https://nodejs.org/en/) RESTful api service for facial recognition authentication. The service employs [Microsoft's Cognitive Services](https://azure.microsoft.com/en-us/services/cognitive-services/) for [Facial Recognition and Detection](https://azure.microsoft.com/en-us/services/cognitive-services/face/).

This web service uses [Babel](https://babeljs.io/) to employ modern JavaScript syntax across the codebase.

## Prerequisites

Download and install the following prerequisties in order to get started.

- [Node.js](https://nodejs.org/en/)
- [MongoDB](https://www.mongodb.com/)

## Quickstart

Follow the following set of simple instructions in order to get up and running quickly in a development environment.

1. Globally install bunyan for logging
```
npm install -g bunyan
```

2. Install dependencies
```
npm install
```

3. Start MongoDB 
- If you are on OSX and use [Homebrew](https://brew.sh) you can simply use [Brew Services](https://github.com/Homebrew/homebrew-services) by default:
```
brew services start mongodb
```

- If you are on Windows you can quite simply follow the instructions [here](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/#run-mongodb-community-edition) and run:
```
mongod
```

4. Start the server in development mode
```
npm run watch
```

## Facial Authentication

The service exposes two endpoints for Facial Authentication -  registration and login.

### Registration
- `/accounts/register`
### Login
- `/accounts/login`

Both of these endpoints take a JSON Object body as part of the Request containing two fields:

- Username: String
- Image Data Url: String - Base64 Encoded Image Data Url - [See Here!](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs) 

### Example

```javascript
{
    username: 'YourAwesomeUsername',
    imageUrl: 'data:image/jpeg;base64,/9j/4AAQSkZ...FjWa0aP/Z'
}
```

## Scores

The service is used in conjuction with a Front End mobile application developed using [Ionic Native](https://ionicframework.com/docs/native/) and targets android mobile devices. The API offers a number of routes for updating user scores for a simple mobile game based around mathematical arithmitic. 

The routes service a HTTP PUT Request and are defined as follows:

### Update Score Addition
- `/scores/addition`
### Update Score Subtraction
- `/scores/subtraction`
### Update Score Multiplication
- `/scores/multiplication`

Each of the endpoints listed above take a JSON Object body as part of the Request containing two fields:

- Username: String
- Score: Number

## Example

```javascript
{
    username: 'YourAwesomeUsername',
    score: 100
}
```

## Heroku Deployment

The web service has been deployed to [Heroku](https://www.heroku.com/) using the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) in conjunction with the [MongoLab's mLab](https://elements.heroku.com/addons/mongolab) add-on for cloud hosted databases.

Deploy your own Heroku Service using these simple Heroku CLI commands where $MY_APP is your own application name.

```
heroku create $MY_APP

heroku addons:create mongolab

git add .
git commit -m 'Pushing to Heroku'
git push heroku master
```

Your brand new Node.js web service is availabe at - https://$MY_APP.herokuapp.com.

Verify that the Node.js web service is alive by using the `healthcheck` endpoint with a HTTP client such as [cURL](https://curl.haxx.se/) or [Postman](https://www.getpostman.com/). A healthy application build and deployment should yield a HTTP 200 OK. 

For Example:

```
curl -v https://$MY_APP.herokuapp.com/healthcheck
```

**NOTE**: When you create a mLab add-on, the database connection URI is stored as a config var. Heroku config variables are equivalent to an environment variable, which you can use in development and your local environment. You can access this variable in your Node.js code as `process.env.MONGODB_URI`.

## Microsoft Face API

An API Key for consuming the Microsoft Cognitive Services Face API can be obtained [here!](https://azure.microsoft.com/en-us/try/cognitive-services/).

**NOTE**: This service currently employs a limited 30 day trial of the Face API service and is scheduled to expire on May 6th 2018.

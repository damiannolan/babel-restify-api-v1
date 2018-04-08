# Babel Restify API for Facial Auth Services

This repository contains a [Node.js](https://nodejs.org/en/) RESTful api service for facial recognition authentication. The service employs [Microsoft's Cognitive Services](https://azure.microsoft.com/en-us/services/cognitive-services/) for [Facial Recognition and Detection](https://azure.microsoft.com/en-us/services/cognitive-services/face/).

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

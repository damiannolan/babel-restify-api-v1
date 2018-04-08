# babel-restify-api-v1
RESTful API for primarily handling interactions with Microsoft's Cognitive Services for Facial Recognition


## Prerequisites

Download and install the following prerequisties in order to get started.

- [Node.js](https://nodejs.org/en/)
- [MongoDB](https://www.mongodb.com/)

## Quickstart

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

- If you are on Windows you can quite simply follow the instructions [here](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/#run-mongodb-community-edition)
```
mongod
```

4. Start the server in development mode
```
npm run watch
```

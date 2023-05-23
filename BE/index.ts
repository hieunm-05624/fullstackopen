// import express = require('express');
import cors from 'cors';
import express from 'express';
import NoteService from './service/noteService';
import PhoneBookService from './service/phoneBookService';
import { morganPractice, requestLogger, unknownEndpoint } from './util/helper';

// init express
const app = express();

/**
 * Init Middleware
 */

// init cors middleware to allow cross origin request
app.use(cors());

// make express show static content from build folder
app.use(express.static('build'))

// init morgan middleware to log request
app.use(morganPractice);

// init request logger middleware to log request
app.use(requestLogger);

// init express middleware to parse request body
app.use(express.json());

// init express middleware to parse request body
app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
});

/**
 * Init Service
 */

// init note service
NoteService(app);

// init phone book service
PhoneBookService(app);

// init unknown endpoint middleware
app.use(unknownEndpoint);

/**
 * Init Server on port 3001
 */
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

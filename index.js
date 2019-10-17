require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

const app = express();
const port = process.env.PORT || 5000;
let uri = ""

// register middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));

// Serve up static assets (heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  uri = process.env.ATLAS_URI  // connection string for Atlas here  
} else {
  uri = process.env.LOCAL_URI  // connection string for localhost mongo here  
}

// connection to database
mongoose.connect(uri, { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true 
});

const db = mongoose.connection;
db.once('open', () => {
  console.log("MongoDB connection is live");
})

// register api catalogue
const exercisesRouter = require('./routes/exercises');
const usersRouter =     require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

const User = require('./models/user.model.js')
const Exercise = require('./models/exercise.model.js')
// User.create([
//   {
//     "username": "arely"
// },
// {
//     "username": "victor"
// }
// ])

// Exercise.create([
//   {
//     "username": "arely",
//     "description": "sitting",
//     "duration": 20,
//     "date": "2019-10-16"
// }
// ])

// Creating live connection to reactjs app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
}).on('err', (err) => {
  console.log('on error handler', err);
});

process.on("uncaughtException", (err) => {
  console.log('process.on handler', err)
})

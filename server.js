const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const studentRoutes = require('./routes/student');
const teacherRoutes = require('./routes/teacher');



dotenv.config();

const app = express();
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use('/students', studentRoutes);
app.use('/teachers', teacherRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
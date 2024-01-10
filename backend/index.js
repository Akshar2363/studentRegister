const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const db = 'studentRegister'
const mongoURL = `mongodb://127.0.0.1:27017/${db}`
const port = 5000

mongoose.connect(mongoURL).then(()=>{
  app.listen(port, ()=> console.log(`Backend listening on : http://127.0.0.1:${port}`));
  console.log("Connection to database Successful!");
}).catch((error)=>{console.log(`${error} : Connection Unsuccessful!`)}); 

app.use(express.json());
app.use(cors());

app.use('/api/auth', require('./routes/auth'));


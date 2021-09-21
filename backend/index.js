const connectToMongo = require("./db");
const express = require('express');

const app = express();
const port = 3001;

connectToMongo();

app.get('/', (req, res) => {
  res.send('Hello Aryan!');
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})
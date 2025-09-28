const express = require('express');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  return res.send('Hello from express!');
});
//console.log("Hello, World!");

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
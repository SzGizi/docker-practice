const express = require('express');

const app = express();
const port = process.env.PORT;

app.get('/', (req, res) => {
  res.send('Hello from express!');
});

app.listen(port, () => {
  console.log(`Server is lisening at http://localhost:${port}`);
});
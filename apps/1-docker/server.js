const express = require('express');
const chalk = require('chalk')

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, HOST);
console.log(chalk.magenta(`Running on http://${HOST}:${PORT}`));
const express = require('express');
const routes = require('./routes');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use('/categories', routes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
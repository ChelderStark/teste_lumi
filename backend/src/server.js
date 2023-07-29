const express = require('express');
const routes = require('./app')
require('dotenv').config()

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.listen(3000, () => console.log('🚀 backend started 🏆'));

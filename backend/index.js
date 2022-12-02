const express = require('express');
const logger = require('./middleware/logger')
const app = express();

// Initialize the middleware
app.use(logger);
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/products', require('./routes/api/products'))

const PORT = 5000;

app.listen(PORT, () => console.log("hi there"));
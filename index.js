const express = require('express');
const logger = require('./middleware/logger');
const app = express();

// Initialize the middleware
app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/tasks', require('./routes/api/tasks'));

const PORT = 3500;

app.listen(PORT, () => console.log(`Server started on port ${PORT}!!!`));
require('dotenv').config();
const express = require('express');
const userRoutes = require('./src/routes/userRoutes');
const errorHandler = require('./src/middleware/errorHandler');
const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use('/users', userRoutes);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Application is listening on port ${port}`);
});
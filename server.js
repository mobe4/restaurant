const express = require('express');
const bodyParser = require('body-parser');
const { connect } = require('./db');

const app = express();
app.use(bodyParser.json());

connect().catch(console.dir);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server started on port ${port}`));

// Importing routes
const restaurantRoutes = require('./routes/restaurant');

app.use('/api/restaurants', restaurantRoutes);

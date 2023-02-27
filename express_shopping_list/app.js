const express = require('express');
const app = express();
const server = require('./server')
const ExpressError = require('./expressError')
const itemRoutes = require('./routes/itemRoutes')
const morgan = require("morgan");

// Middleware:
app.use(express.json());
app.use(morgan('dev'));


// Routes from router:
app.use('/items', itemRoutes);


// Error handlers:
app.use(function(req, res, next) {
    return new ExpressError("Not found", 404);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    return res.json({
        error: err.message,
    });
});

module.exports = app
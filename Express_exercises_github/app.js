const express = require('express');
const app = express();
app.use(express.json());
const ExpressError = require('./expressErrors')
const {convertQueryToNums, getMean, getMedian, createCounter, getMode} = require('./helpers')


app.get('/mean', function(req, res, next) {
    if(!req.query.nums) {
        throw new ExpressError('Query must be a list of numbers separated by commas.', 400);
    }
    let numsQueryString = req.query.nums.split(',');
    let nums = convertQueryToNums(numsQueryString);
    if(nums instanceof Error) {
        throw new ExpressError(nums.msg);
    }
    let mean = getMean(nums)
    return res.json({operation: "mean", value: mean});
})


app.get('/median', function(req, res) {
    if(!req.query.nums) {
        throw new ExpressError('Query must be a list of numbers separated by commas.', 400);
    }
    let numsQueryString = req.query.nums.split(',');
    let nums = convertQueryToNums(numsQueryString);
    if (nums instanceof Error) {
        throw new ExpressError(nums.message);
    }
    let median = getMedian(nums)
    return res.json({operation: "median", value: median});
})


app.get('/mode', function(req, res) {
    if(!req.query.nums) {
        throw new ExpressError('Query must be a list of numbers separated by commas.', 400)
    }
    let numsQueryString = req.query.nums.split(',');
    let nums = convertQueryToNums(numsQueryString);
    if (nums instanceof Error) {
        throw new ExpressError(nums.message);
    }
    let mode = getMode(nums);
    return res.json({operation: "mode", value: mode});
})


app.use(function (req, res, next) {
    const err = new ExpressError("Not Found", 404);
    return next(err);
});


app.use(function (req, res, next) {
    res.status(err.status || 500);
    return res.json({
        error: err,
        message: err.message, 
        status: err.status
    });
});


app.listen(3000, function () {
    console.log("App running on port 3000");
})
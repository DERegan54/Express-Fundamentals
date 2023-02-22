const {getMean, getMedian, getMode} = require('./helpers');

describe('get the mean', function () {
  test('get the mean of an array of numbers', function () {
    const mean = getMean([1,2,3,4,5]);
    expect (mean).toEqual(3);
  });
});


describe('get the median', function () {
    test('get the median of an array of odd numbers', function () {
        const median = getMedian([1,2,3,4,5]);
        expect(median).toEqual(3)
    })

    test('get the median of an array of even numbers', function () {
        const median = getMedian([1,2,3,4]);
        expect(median).toEqual(2.5);
    });
});


describe('get the mode', function () {
    test('get the mode of an array of numbers', function () {
        const mode = getMode([1,2,1,2,2,3]);
        expect(mode).toEqual(2);
    });
});
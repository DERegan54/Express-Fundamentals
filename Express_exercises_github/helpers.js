
// this function take the query string and converts the values into numbers.
function convertQueryToNums(numsQueryString) {
    let nums = [];
    for(let i=0; i<numsQueryString.length; i++) {
        let strToNum = Number(numsQueryString[i]);
        if(strToNum == NaN){
            return new Error(`${numsQueryString} contains an invalid number(s).`);
        }
        nums.push(strToNum);
    }
    return nums;
}


// this function finds the mean of the inputted numbers
function getMean(nums) {
    let sum = 0
    for (i of nums) {
        sum += i
    }
    let result = sum/nums.length
    return result
}


// this function finds the median of the inputted numbers 
function getMedian(nums) {
    let sortedNums = nums.sort((a,b) => a-b);
    let midIdx = Math.floor(sortedNums.length/2);
    let median;
    if(sortedNums.length % 2 === 0) {
        median = (sortedNums[midIdx] + sortedNums[midIdx-1]) / 2;
    } else {
        median = sortedNums[midIdx];
    }
    return median
}


// this function creates an object to keep track of the frequency of the numbers in the inputted array
function createCounter(arr) {
    let counter = {};
    arr.forEach(number => {
        if(!counter[number]){
            counter[number] = 1;
        } else {
            counter[number] += 1;
        }
    });
    return counter
}   

// arr = [1,2,2,3,4,5]
// let counter = {
//     '1': 1,
//     '2': 2,
//     '3': 1,
//     '4': 1,
//     '5': 1
// }

// this function finds the most frequent number in the array (mode)
function getMode(arr) {
    let counter = createCounter(arr);
    let count = 0;
    let mode;

    for(let key in counter) {
        if(counter[key] > count) {
            count = counter[key];
            mode = key;
        }
    }
    return Number(mode);
}


module.exports = {convertQueryToNums, getMean, getMedian, getMode}


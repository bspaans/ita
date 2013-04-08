var Util = {}


Util.isSorted = function(arr) {

    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == undefined || arr[i] < arr[i - 1]) {
            return false;
        }
    }
    return true;
};


Util.randomArray = function(n, min, max) {

    var arr = new Array(n);
    for (var i = 0; i < n; i++) {
        arr[i] = Util.randRange(min, max);
    }
    return arr;
};

Util.randomDoubleArray = function(n, min, max) {

    var arr = new Array(n);
    for (var i = 0; i < n; i++) {
        arr[i] = Math.random() * (max - min) + min;
    }
    return arr;
};


Util.randRange = function(min, max) {

    return Math.floor(Math.random() * (max - min + 1)) + min;
};


Util.swapVariables = function(arr, i, j) {

    var tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
};

Util.getMean = function(arr) {

    var sum = 0;
    for (var i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    return sum / arr.length;
};

Util.getVariance = function(arr, mean) {

    var mean = mean == undefined ? Util.getMean(arr) : mean;
    var absDiffSum = 0;
    for (var i = 0; i < arr.length; i++) {
        absDiffSum += Math.pow(Math.abs(arr[i] - mean), 2);
    }
    return absDiffSum / arr.length;
}

Util.getStandardDeviation = function(arr, mean) {
    return Math.sqrt(Util.getVariance(arr, mean));
}

Util.getStatistics = function(arr, mean, predictedMean) {
    var statistics = {};
    statistics.mean = mean == undefined ? Util.getMean(arr) : mean;
    statistics.variance = Util.getVariance(arr, statistics.mean);
    statistics.standardDeviation = Math.sqrt(statistics.variance);

    if (predictedMean != undefined) {
        statistics.distanceFromPredictionInStdDevs = 
            Util.getDistanceFromPredictedMeanInStandardDeviations(statistics.mean, predictedMean, statistics.standardDeviation);
    }
    return statistics;
}

Util.getDistanceFromPredictedMeanInStandardDeviations = function(mean, predictedMean, stddev) {
    var distance = Math.abs(predictedMean - mean);
    return distance / stddev;

};

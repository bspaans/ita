module("Utilities");

test("I can test that an array is sorted correctly", function() {

    ok(Util.isSorted([1,2,3]));
    ok(Util.isSorted([1,1,2,3]));
    ok(Util.isSorted([]));
    ok(!Util.isSorted([3,2,1]));
    ok(!Util.isSorted([3,undefined,1]));
    ok(!Util.isSorted([undefined,1]));
});

test("I can get a random integer in a given range", function() {

    for (var i = 0; i < 50; i++) {
        for (var j = i + 1; j < 50; j++) {
            var rnd = Util.randRange(i, j);
            ok(rnd >= i);
            ok(rnd <= j);
        }
    }
});

test("I can create an array containing random numbers", function() {

    var arraySize = 100;
    var arrayMinValue = 99;
    var arrayMaxValue = 100;
    var randomArr = Util.randomArray(arraySize, arrayMinValue, arrayMaxValue);

    equal(randomArr.length, arraySize);
    for (var i = 0; i < arraySize; i++) {
        ok(randomArr[i] >= arrayMinValue && randomArr[i] <= arrayMaxValue);
    }
});

test("I can create an array containing random doubles", function() {

    var arraySize = 100;
    var arrayMinValue = 2.0;
    var arrayMaxValue = 3.0;
    var randomArr = Util.randomDoubleArray(arraySize, arrayMinValue, arrayMaxValue);

    equal(randomArr.length, arraySize);
    for (var i = 0; i < arraySize; i++) {
        ok(randomArr[i] >= arrayMinValue && randomArr[i] <= arrayMaxValue);
    }
});

test("I can get the mean of a data set", function() {

    var arr = [1,2,3,4];
    equal(Util.getMean(arr), 2.5);

    var arr = [1,2,3];
    equal(Util.getMean(arr), 2);

    var arr = [2,4,4,4,5,5,7,9];
    equal(Util.getMean(arr), 5);
});

test("I can get the variance of a data set", function() {

    var arr = [1,2,3,4,5];
    equal(Util.getVariance(arr), 2);

    var arr = [1,2,3];
    equal(Util.getVariance(arr), 2/3);

    var arr = [2,4,4,4,5,5,7,9];
    equal(Util.getVariance(arr), 4);
});

test("I can get the standard deviation of a dataset", function() {

    var arr = [1,2,3,4,5];
    equal(Util.getStandardDeviation(arr), Math.sqrt(2)); 

    var arr = [1,2,3];
    equal(Util.getStandardDeviation(arr), Math.sqrt(2/3));

    var arr = [2,4,4,4,5,5,7,9];
    equal(Util.getStandardDeviation(arr), 2);
});

test("I can get some statistics of a data set", function() {

    var arr = [1,2,3,4,5];
    var statistics = Util.getStatistics(arr);
    equal(statistics.mean, 3);
    equal(statistics.variance, 2)
    equal(statistics.standardDeviation, Math.sqrt(2));
    
    var arr = [1,2,3,4,5];
    var statistics = Util.getStatistics(arr, 3, 4);
    equal(statistics.mean, 3);
    equal(statistics.variance, 2)
    equal(statistics.standardDeviation, Math.sqrt(2));
    equal(statistics.distanceFromPredictionInStdDevs, 1 / Math.sqrt(2));
});

test("I can get the distance between the mean and the predicted mean in standard deviations", function() {

    var mean = 2;
    var predicted = 3;
    var stddev = 0.5;
    equal(Util.getDistanceFromPredictedMeanInStandardDeviations(mean, predicted, stddev), 2)
});

test("I can create an array containing random numbers, and prove that it's at least sort of random", function() {

    expect(0);

    var arraySize = 1000;
    var arrayMinValue = 0;
    var arrayMaxValue = 10;
    var randomArr = Util.randomArray(arraySize, arrayMinValue, arrayMaxValue);

    var dataset = [];
    for (var i = 0; i < 11; i++) {
        dataset[i] = 0;
    }
    for (var i = 0; i < arraySize; i++) {
        dataset[randomArr[i]]++;
    }

    var expectedMean = arraySize / (arrayMaxValue - arrayMinValue);
    var statistics = Util.getStatistics(dataset, undefined, expectedMean);
});

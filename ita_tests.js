
var fuzzTestSortFunction = function(sortFunction, nrOfRuns, nrOfElems) {

    var nrOfElems = nrOfElems == undefined ? 100 : nrOfElems;
    for (var i = 0; i < nrOfRuns; i++) {
        var arr = randomArray(nrOfElems, 0, 100);
        var sorted = sortFunction(arr);
        ok(isSorted(sorted));
    }
};


module("Introduction to Algorithms - chapter 2.1");

test("I can test that an array is sorted correctly", function() {

    ok(isSorted([1,2,3]));
    ok(isSorted([1,1,2,3]));
    ok(isSorted([]));
    ok(!isSorted([3,2,1]));
});

test("I can create an array containing random numbers", function() {

    var arraySize = 100;
    var arrayMinValue = 99;
    var arrayMaxValue = 100;
    var randomArr = randomArray(arraySize, arrayMinValue, arrayMaxValue);

    equal(randomArr.length, arraySize);
    for (var i = 0; i < arraySize; i++) {
        ok(randomArr[i] >= arrayMinValue && randomArr[i] <= arrayMaxValue);
    }
});

test("Insertion sort", function() {

    var arr = [3,2,1]
    var sorted = insertionSort(arr);
    deepEqual(sorted, [1,2,3]);
});

test("Insertion sort fuzz test", function() {

    fuzzTestSortFunction(insertionSort, 100, 100);
    fuzzTestSortFunction(insertionSort, 100, 101);
});


module("Introduction to Algorithms - chapter 2.3");

test("Merge sort", function() {

    var arr = [3,2,1]
    var sorted = mergeSort(arr);
    deepEqual(sorted, [1,2,3]);
});

test("Merge sort fuzz test", function() {

    fuzzTestSortFunction(mergeSort, 100, 100);
    fuzzTestSortFunction(mergeSort, 100, 101);
});

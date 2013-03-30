

module("Introduction to Algorithms - chapter 2.1");


test("Sort predicate", function() {

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

    for (var i = 0; i < 50; i++) {
        var arr = randomArray(100, 0, 100);
        var sorted = insertionSort(arr);
        ok(isSorted(sorted));
    }
});



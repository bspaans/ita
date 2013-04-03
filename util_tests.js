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

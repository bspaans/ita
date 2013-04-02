
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

test("Bubble sort", function() {

    var arr = [3,2,1]
    var sorted = bubbleSort(arr);
    deepEqual(sorted, [1,2,3]);
});

test("Bubble sort fuzz test", function() {

    fuzzTestSortFunction(bubbleSort, 100, 100);
    fuzzTestSortFunction(bubbleSort, 100, 101);
});


module("Introduction to Algorithms - chapter 4.1");

test("I can find the max crossing sub array", function() {

    var arr = [1,5,4]
    var result = findMaxCrossingSubArray(arr, 0, 1, 2)
    equal(result.maxLeft, 0);
    equal(result.maxRight, 2);
    equal(result.sum, 10);

    arr = [-1, 1, 5, 4, -1]
    result = findMaxCrossingSubArray(arr, 0, 2, 4)
    equal(result.maxLeft, 1);
    equal(result.maxRight, 3);
    equal(result.sum, 10);

    arr = [1,5]
    result = findMaxCrossingSubArray(arr, 0, 0, 1)
    equal(result.maxLeft, 0);
    equal(result.maxRight, 1);
    equal(result.sum, 6);
});

test("I can't find the max crossing sub array if the given indices are nonsensical", function() {

    throws(function() { findMaxCrossingSubArray([1], 0, 0, 0)}, /^Array should have at least two elements/);
    throws(function() { findMaxCrossingSubArray([1,2], 0, 1, 1)}, /^Mid should be lower than high$/);
    throws(function() { findMaxCrossingSubArray([1,2], 0, -1, 1)}, /^Mid should be equal to or higher than low$/);
    throws(function() { findMaxCrossingSubArray([1,2], 0, 0, 2)}, /^Indices should be in range$/);
    throws(function() { findMaxCrossingSubArray([1,2], -1, 0, 1)}, /^Indices should be in range$/);
});

test("I can find the maximum sub array", function() {

    var arr = [-1, 1, 2, 3, -1];
    var result = findMaxSubArray(arr);
    equal(result.maxLeft, 1);
    equal(result.maxRight, 3);
    equal(result.sum, 6);

    // figure 4.3
    arr = [13, -3, -25, 20, -3, -16, -23, 18, 20, -7, 12, -5, -22, 15, -4, 7]
    result = findMaxSubArray(arr);
    equal(result.maxLeft, 7);
    equal(result.maxRight, 10);
    equal(result.sum, 43);
});

test("I can multiply two square matrices", function() {

    var matrixA = [[1,1,1],[2,2,2], [3,3,3]]
    var matrixB = [[1,2,3],[1,2,3], [1,2,3]]
    var result = squareMatrixMultiply(matrixA, matrixB);
    deepEqual(result, [[3,6,9], [6,12,18], [9,18,27]])
});

module("Introduction to Algorithms - chapter 5.3");



test("I can permute an array by sorting, provided that all the random priorities are distinct", function() {

    var arr = [2,5,1,8,9,8]

    // Controlled "randomization"
    var rnd = arr.length;
    randomFunction = function() {
        rnd--;
        return rnd;
    };
    var permutedArr = permuteArrayBySorting(randomFunction, arr); 

    equal(permutedArr.length, arr.length);
    deepEqual(permutedArr, arr.reverse());

    var rnd = 0;
    randomFunction = function() {
        rnd++;
        return rnd;
    };
    permutedArr = permuteArrayBySorting(randomFunction, arr);
    equal(permutedArr.length, arr.length);
    deepEqual(permutedArr, arr);
});

test("I can permute an array by sorting, provided that all the random priorities are distinct. Fuzz test", function() {

    for (var i = 0; i < 100; i++) {
        var randomArr = randomArray(100, 1, 100);
        var permutedArr = permuteArrayBySorting(Math.random, randomArr);
        if (randomArr.length == permutedArr.length) {
            notDeepEqual(randomArr, permutedArr);
        }
    }
});


test("I can permute an array by randomizing in place", function() {

    var arr = [2,5,1,8,9]

    var rnd = 1.0;
    var randomFunction = function() {
        rnd -= 0.2;
        return rnd;
    };
    var permutedArr = randomizeArrayInPlace(randomFunction, arr); 

    equal(permutedArr.length, arr.length);
    deepEqual(permutedArr, [8,1,5,2,9]);
});

test("I can permute an array by randomizing in place. Fuzz test.", function() {

    for (var i = 0; i < 100; i++) {
        var randomArr = randomArray(100, 1, 100);
        var permutedArr = randomizeArrayInPlace(Math.random, randomArr);
        equal(randomArr.length, permutedArr.length);
        notDeepEqual(randomArr, permutedArr);
    }
});


module("Introduction to Algorithms - chapter 6.1", {
    setup: function() { this.heap = new Heap([16, 14, 10, 8, 7, 9, 3, 2, 4, 1]); }
});

test("I can navigate a heap", function() {

    equal(this.heap.parent(1), 0);
    equal(this.heap.parent(2), 0);
    equal(this.heap.parent(3), 1);
    equal(this.heap.parent(4), 1);
    equal(this.heap.parent(5), 2);
    equal(this.heap.parent(6), 2);

    equal(this.heap.left(0), 1);
    equal(this.heap.left(1), 3);
    equal(this.heap.left(2), 5);
    equal(this.heap.left(3), 7);
    equal(this.heap.left(4), 9);

    equal(this.heap.right(0), 2);
    equal(this.heap.right(1), 4);
    equal(this.heap.right(2), 6);
    equal(this.heap.right(3), 8);
});


module("Introduction to Algorithms - chapter 6.2", {
    setup: function() { this.heap = new Heap([16, 14, 10, 8, 7, 9, 3, 2, 4, 1]); }
});

var checkMaxHeapProperty = function(heap) {
    for (var i = 0; i < heap.length; i++) {
        if (heap.array[heap.parent(i)] < heap.array[i]) {
            return false;
        }
    }
    return true;
};

test("The heap maintains the max-heap property", function() {

    ok(checkMaxHeapProperty(this.heap));
    this.heap.array[2] = 0;
    this.heap.maxHeapify(2);
    ok(checkMaxHeapProperty(this.heap));

    this.heap.array[1] = 0;
    this.heap.maxHeapify(1);
    ok(checkMaxHeapProperty(this.heap));
});


module("Introduction to Algorithms - chapter 6.3");

test("I can build a heap", function() {

    var heap = new Heap();
    heap.buildMaxHeap([1,2,3,4,5,6]);
    ok(checkMaxHeapProperty(heap));
    deepEqual(heap.array, [6,5,3,4,2,1]);

    heap.buildMaxHeap([1,2,3,4,5]);
    ok(checkMaxHeapProperty(heap));
    heap.buildMaxHeap([1]);
    ok(checkMaxHeapProperty(heap));
});


module("Introduction to Algorithms - chapter 6.4");

test("I can heap sort", function() {

    var arr = [3,1,6,3,8];
    var heap = new Heap();
    var sorted = heap.heapSort(arr);
    ok(isSorted(sorted));
    ok(checkMaxHeapProperty(heap));
});

test("Heap sort fuzz test", function() {

    var heap = new Heap();
    fuzzTestSortFunction(heap.heapSort, 100, 100);
    fuzzTestSortFunction(heap.heapSort, 100, 101);
});


module("Introduction to Algorithms - chapter 6.5");

test("I can create a max priority queue", function() {

    var queue = new PriorityQueue([2,3,4,5,6]);
    ok(checkMaxHeapProperty(queue));
    equal(queue.maximum(), 6);
});

test("I can get the maximum element from the priority queue", function() {

    var queue = new PriorityQueue([2,3,4,5,6]);
    equal(queue.maximum(), 6);
});

test("I can extract the maximum element from the queue, while maintaining the max-heap priority", function() {

    var queue = new PriorityQueue([2,3,4,5,6]);
    ok(checkMaxHeapProperty(queue));
    equal(queue.maximum(), 6);
    var max = queue.extractMax();
    equal(max, 6);
    ok(checkMaxHeapProperty(queue));
    equal(queue.maximum(), 5);
});

test("Trying to extract the maximum element from an empty queue will throw a Heap underflow", function() {

    var queue = new PriorityQueue([2]);
    queue.extractMax();
    throws(function() { queue.extractMax() }, /Heap underflow/);
});


test("I can increase a priority queue's key, while maintaining the max-heap property", function() {

    var queue = new PriorityQueue([2,3,4,5,6]);
    ok(checkMaxHeapProperty(queue));
    queue.increaseKey(1, 7);
    ok(checkMaxHeapProperty(queue));

    queue.increaseKey(3, 8);
    ok(checkMaxHeapProperty(queue));
});

test("If I try to increase a key, but the value is lower than it currently is I get an error message", function() {

    var queue = new PriorityQueue([2,3,4,5,6]);
    throws(function() { queue.increaseKey(1, 1) }, /new key is smaller than current key/);
});

test("I can insert a new element into the priority queue, while maintaining the max-heap property", function() {

    var queue = new PriorityQueue([2,3,4,5,6]);
    ok(checkMaxHeapProperty(queue));
    queue.insert(7);
    ok(checkMaxHeapProperty(queue));
    queue.insert(1);
    ok(checkMaxHeapProperty(queue));
    queue.insert(4);
    ok(checkMaxHeapProperty(queue));
});

module("Introduction to Algorithms - Part II - chapter 5.3");

test("I can permute an array by sorting, provided that all the random priorities are distinct", function() {

    var arr = [2,5,1,8,9,8]

    // Controlled "randomization"
    var rnd = arr.length;
    var randomFunction = function() {
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
        var randomArr = Util.randomArray(100, 1, 100);
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
        var randomArr = Util.randomArray(100, 1, 100);
        var permutedArr = randomizeArrayInPlace(Math.random, randomArr);
        equal(randomArr.length, permutedArr.length);
        notDeepEqual(randomArr, permutedArr);
    }
});


module("Introduction to Algorithms - Part II - chapter 6.1");

test("I can navigate a heap", function() {

    heap = new Heap([16, 14, 10, 8, 7, 9, 3, 2, 4, 1]); 
    equal(heap.parent(1), 0);
    equal(heap.parent(2), 0);
    equal(heap.parent(3), 1);
    equal(heap.parent(4), 1);
    equal(heap.parent(5), 2);
    equal(heap.parent(6), 2);

    equal(heap.left(0), 1);
    equal(heap.left(1), 3);
    equal(heap.left(2), 5);
    equal(heap.left(3), 7);
    equal(heap.left(4), 9);

    equal(heap.right(0), 2);
    equal(heap.right(1), 4);
    equal(heap.right(2), 6);
    equal(heap.right(3), 8);
});


module("Introduction to Algorithms - Part II - chapter 6.2");

var checkMaxHeapProperty = function(heap) {
    for (var i = 0; i < heap.length; i++) {
        if (heap.array[heap.parent(i)] < heap.array[i]) {
            return false;
        }
    }
    return true;
};

test("The heap maintains the max-heap property", function() {

    heap = new Heap([16, 14, 10, 8, 7, 9, 3, 2, 4, 1]); 
    ok(checkMaxHeapProperty(heap));
    heap.array[2] = 0;
    heap.maxHeapify(2);
    ok(checkMaxHeapProperty(heap));

    heap.array[1] = 0;
    heap.maxHeapify(1);
    ok(checkMaxHeapProperty(heap));
});


module("Introduction to Algorithms - Part II - chapter 6.3");

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


module("Introduction to Algorithms - Part II - chapter 6.4");

test("I can heap sort", function() {

    var arr = [3,1,6,3,8];
    var heap = new Heap();
    var sorted = heap.heapSort(arr);
    ok(Util.isSorted(sorted));
    ok(checkMaxHeapProperty(heap));
});

test("Heap sort fuzz test", function() {

    var heap = new Heap();
    fuzzTestSortFunction(heap.heapSort, 100, 100);
    fuzzTestSortFunction(heap.heapSort, 100, 101);
});


module("Introduction to Algorithms - Part II - chapter 6.5");

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


module("Introduction to Algorithms - Part II - chapter 7.1");

var arrayIsPartitionedCorrectly = function(arr, pivot) {
    for (var i = 0; i < arr.length; i++) {
        if (i <= pivot && arr[i] > arr[pivot]) {
            return false;
        } 
        if (i > pivot && arr[i] < arr[pivot]) {
            return false;
        }  
    }
    return true;
}

test("I can partition an array", function() {

    // figure 7.1
    var arr = [2,8,7,1,3,5,6,4];
    var pivot = partition(arr, 0, arr.length - 1);
    deepEqual(arr, [2,1,3,4,7,5,6,8]);
    equal(pivot, 3);
    ok(arrayIsPartitionedCorrectly(arr, pivot));
});

test("I can partition an array. Fuzz test", function() {

    for (var i = 0; i < 100; i++) {
        var randomArr = Util.randomArray(i + 1, 1, 100);
        var pivot = partition(randomArr, 0, randomArr.length - 1);
        ok(arrayIsPartitionedCorrectly(randomArr, pivot));
    }
});

test("Quick sort", function() {

    var arr = [2,8,7,1,3,5,6,4];
    var sorted = quickSort(arr);
    deepEqual(sorted, [1,2,3,4,5,6,7,8]);
    
    arr = [3,2,1];
    sorted = quickSort(arr);
    deepEqual(sorted, [1,2,3]);
});

test("Quick sort. Fuzz test", function() {

    fuzzTestSortFunction(quickSort, 100, 100);
    fuzzTestSortFunction(quickSort, 100, 101);
});


module("Introduction to Algorithms - Part II - chapter 7.3");

test("I can run quick sort with another partition function", function() {

    var functionCalled = false;
    var anotherPartitionFunction = function(arr, left, right) {
        functionCalled = true;
        return left;
    };
    sorted = quickSort([3,2,1], anotherPartitionFunction);
    ok(functionCalled);
});

test("I can partition an array with a random pivot. Fuzz test.", function() {

    for (var i = 0; i < 100; i++) {
        var randomArr = Util.randomArray(i + 1, 1, 100);
        var pivot = randomizedPartition(randomArr, 0, randomArr.length - 1);
        ok(arrayIsPartitionedCorrectly(randomArr, pivot));
    }
});

test("I can run quick sort with randomizedPartition and it will still work", function() {

    var arr = [2,8,7,1,3,5,6,4];
    var sorted = quickSort(arr, randomizedPartition);
    deepEqual(sorted, [1,2,3,4,5,6,7,8]);
});

test("Randomized quick sort. Fuzz test", function() {

    fuzzTestSortFunction(randomizedQuickSort, 100, 100);
    fuzzTestSortFunction(randomizedQuickSort, 100, 101);
});


module("Introduction to Algorithms - Part II - chapter 7.4");

test("Tail recursive quick sort", function() {

    var arr = [2,8,7,1,3,5,6,4];
    var sorted = tailRecursiveQuickSort(arr);
    deepEqual(sorted, [1,2,3,4,5,6,7,8]);
    
    arr = [3,2,1];
    sorted = tailRecursiveQuickSort(arr);
    deepEqual(sorted, [1,2,3]);
});

test("Tail recursive quick sort. Fuzz test", function() {

    fuzzTestSortFunction(tailRecursiveQuickSort, 100, 100);
    fuzzTestSortFunction(tailRecursiveQuickSort, 100, 101);
});

test("I can run tail recursive quick sort with randomizedPartition and it will still work", function() {

    var arr = [2,8,7,1,3,5,6,4];
    var sorted = tailRecursiveQuickSort(arr, randomizedPartition);
    deepEqual(sorted, [1,2,3,4,5,6,7,8]);
});

test("Tail recursive randomized quick sort. Fuzz test", function() {

    fuzzTestSortFunction(randomizedTailRecursiveQuickSort, 100, 100);
    fuzzTestSortFunction(randomizedTailRecursiveQuickSort, 100, 101);
});


module("Introduction to Algorithms - Part II - chapter 8.2");

test("I can count the occurences of a value in an array, when an array has values between 0 and k", function() {

    var arr = [3,2,1,3,2,1];
    var count = countOccurencesOfValues(arr, 3);
    deepEqual(count, [0,2,2,2]);

    var arr = [1,2,3,5,5];
    var count = countOccurencesOfValues(arr, 5);
    deepEqual(count, [0,1,1,1,0,2]);

    var arr = [0,0,0];
    var count = countOccurencesOfValues(arr, 0);
    deepEqual(count, [3]);
});

test("Counting sort", function() {

    var arr = [3,2,1];
    var sorted = countingSort(arr, 3);
    deepEqual(sorted, [1,2,3]);
});

test("Counting sort. Fuzz test", function() {

    var cSort = function(arr) { return countingSort(arr, 100); }
    fuzzTestSortFunction(cSort, 100, 100);
    fuzzTestSortFunction(cSort, 100, 101);
});


module("Introduction to Algorithms - Part II - chapter 8.4");

test("I can distribute the values in an array into buckets, provided that the values are in range [0, 1)", function() {

    // figure 8.4
    var arr = [0.78, 0.17, 0.39, 0.26, 0.72, 0.94, 0.21, 0.12, 0.23, 0.68];
    var bucketed = distributeOverBuckets(arr);
    deepEqual(bucketed, [[], [0.17, 0.12], [0.26, 0.21, 0.23], [0.39], [], [], [0.68], [0.78, 0.72], [], [0.94]]);

    var arr = [0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9];
    var bucketed = distributeOverBuckets(arr);
    deepEqual(bucketed, [[0.1],[0.2],[0.3],[0.4],[0.5],[0.6],[0.7],[0.8],[0.9]]);

});

test("I can sort the buckets", function() {

    // figure 8.4
    var arr = [0.78, 0.17, 0.39, 0.26, 0.72, 0.94, 0.21, 0.12, 0.23, 0.68];
    var bucketed = distributeOverBuckets(arr);
    var sortedBuckets = sortBuckets(bucketed);
    deepEqual(sortedBuckets, [[], [0.12, 0.17], [0.21, 0.23, 0.26], [0.39], [], [], [0.68], [0.72, 0.78], [], [0.94]]);
});

test("Bucket sort", function() {

    // figure 8.4
    var arr = [0.78, 0.17, 0.39, 0.26, 0.72, 0.94, 0.21, 0.12, 0.23, 0.68];
    var sorted = bucketSort(arr);
    ok(Util.isSorted(sorted));
    deepEqual(sorted, [0.12, 0.17, 0.21, 0.23, 0.26, 0.39, 0.68, 0.72, 0.78, 0.94]);
});

test("Bucket sort. Fuzz test", function() {

    for (var i = 0; i < 100; i++) {
        var arr = Util.randomDoubleArray(i, 0.0, 1.0);
        var sorted = bucketSort(arr);
        ok(Util.isSorted(sorted));
    }
});


module("Introduction to Algorithms - Part II - chapter 9.1");

test("I can find the minimum value of an array", function() {

    var arr = [9,8,7,6,5,4,5,6];
    var min = minimum(arr);
    equal(min, 4);

    var arr = [9,8,7,6,5,4,5,6, -1];
    var min = minimum(arr);
    equal(min, -1);

    var arr = [1,2,3,4,5];
    equal(minimum(arr), 1);
});

test("I can't find the minimum of an empty array", function() {

    throws(function() { minimum([]); }, /Array needs to be non-empty/);
});


module("Introduction to Algorithms - Part II - chapter 9.2");

test("I can select the i-th order statistic of an array containing distinct numbers", function() {

    var arr = [1,2,3,4,5];
    equal(randomizedSelect(arr, 2), 2);
    equal(randomizedSelect(arr, 1), minimum(arr));

    for (var i = 1; i <= 5; i++) {
        equal(randomizedSelect(arr, i), i);
    }
});



var permuteArrayBySorting = function(randomFunction, arr) {
    var arr = arr.slice(0);
    var priorities = []
    for (var i = 0; i < arr.length; i++) {
        var p = Math.floor(randomFunction() * (arr.length ^ 3));
        priorities.push([p, arr[i]])
    }
    priorities.sort(function(a, b) { return a[0] - b[0]; })
    return $.map(priorities, function(item) { return item[1]; });
};


var randomizeArrayInPlace = function(randomFunction, arr) {

    var arr = arr.slice(0);
    var n = arr.length - 1;
    for (var i = 0; i <= n; i++) {
        var rnd = Math.floor(randomFunction() * (n - i)) + i;
        Util.swapVariables(arr, i, rnd);
    }
    return arr;
};

var Heap = function(heapArray) {

    var self = this;
    self.array = heapArray == undefined ? [] : heapArray;
    self.length = self.array.length;

    self.parent = function(index) {
        return Math.floor((Math.max(1, index) - 1) / 2);
    };
    self.left = function(index) {
        return 2 * index + 1;
    };
    self.right = function(index) {
        return 2 * index + 2;
    };
    self.maxHeapify = function(index) {
        var l = self.left(index);
        var r = self.right(index);
        var largest = index;
        largest = (l < self.length && self.array[l] > self.array[index]  ) ? l : largest;
        largest = (r < self.length && self.array[r] > self.array[largest]) ? r : largest;
        if (largest != index) {
            Util.swapVariables(self.array, index, largest);
            self.maxHeapify(largest);
        }
    };
    self.buildMaxHeap = function(arr) {
        self.array = arr;
        self.length = arr.length;
        for (var i = Math.floor(self.length / 2); i >= 0; i--) {
            self.maxHeapify(i);
        }
    };
    self.heapSort = function(arr) {
        var arr = arr.slice(0);
        self.buildMaxHeap(arr);
        for (var i = arr.length - 1; i >= 1; i--) {
            Util.swapVariables(arr, 0, i);
            self.length--;
            self.maxHeapify(0);
        }
        return arr;
    }
    return self;
}

var PriorityQueue = function(queue) {
    var heap = new Heap();
    heap.buildMaxHeap(queue);

    heap.maximum = function() { 
        return heap.array[0]; 
    };
    heap.extractMax = function() {
        if (heap.length <= 0) {
            throw "Heap underflow";
        }

        var max = heap.array[0];
        heap.array[0] = heap.array[heap.length - 1];
        heap.length--;
        heap.maxHeapify(0);
        return max;
    };
    heap.increaseKey = function(index, key) {
        if (key < heap.array[index]) {
            throw "new key is smaller than current key."
        }
        heap.array[index] = key;
        while (index > 0 && heap.array[heap.parent(index)] < heap.array[index]) {
            Util.swapVariables(heap.array, index, heap.parent(index));
            index = heap.parent(index);
        }
    };
    heap.insert = function(key) {
        heap.length++;
        heap.array[heap.length - 1] = Number.NEGATIVE_INFINITY;
        heap.increaseKey(heap.length - 1, key);
    };

    return heap;
};


var partition = function(arr, left, right) {

    var x = arr[right];
    var i = left - 1;
    for (var j = left; j < right; j++) {
        if (arr[j] < x) {
            i++;
            Util.swapVariables(arr, i, j);
        }
    }
    Util.swapVariables(arr, i + 1, right);
    return i + 1;
};

var quickSort = function(arr, partitionFunction) {

    var partitionFunction = partitionFunction == undefined ? partition : partitionFunction;
    var arr = arr.slice(0);

    var quickSortHelper = function(left, right) {
        if (left < right) {
            var pivot = partitionFunction(arr, left, right);
            quickSortHelper(left, pivot - 1);
            quickSortHelper(pivot + 1, right);
        }
    }
    quickSortHelper(0, arr.length - 1);
    return arr;
};

var randomizedPartition = function(arr, left, right) {
    var pivot = Util.randRange(left, right);
    Util.swapVariables(arr, pivot, right);
    return partition(arr, left, right);
};

var randomizedQuickSort = function(arr) { 
    return quickSort(arr, randomizedPartition); 
}

var tailRecursiveQuickSort = function(arr, partitionFunction) {

    var partitionFunction = partitionFunction == undefined ? partition : partitionFunction;
    var arr = arr.slice(0);
    var tailRecursiveQuickSortHelper = function(left, right) {
        while (left < right) {
            var pivot = partitionFunction(arr, left, right);
            tailRecursiveQuickSortHelper(left, pivot - 1);
            left = pivot + 1;
        }
    }
    tailRecursiveQuickSortHelper(0, arr.length - 1);
    return arr;
};

var randomizedTailRecursiveQuickSort = function(arr) { 
    return tailRecursiveQuickSort(arr, randomizedPartition); 
}


var countOccurencesOfValues = function(arr, k) {

    var count = new Array(k);
    for (var i = 0 ; i <= k ; i++) {
        count[i] = 0;
    }

    for (var i = 0; i < arr.length; i++) {
        count[arr[i]]++;
    }
    return count;
};

var countingSort = function(arr, k) {
    var result = new Array(arr.length);
    var count = countOccurencesOfValues(arr, k);
    count[-1] = 0;

    for (var i = 0; i <= k; i++) {
        count[i] += count[i - 1];
    }
    // count[i] now contains the number of elements less than or equal to i

    for (var i = arr.length - 1; i >= 0; i--) {
        result[count[arr[i]] - 1] = arr[i];
        count[arr[i]]--;
    }
    return result;
};


var distributeOverBuckets = function(arr) {

    var n = arr.length;
    var result = new Array(n);

    for (var i = 0; i < n; i++) {
        result[i] = [];
    }

    for (var i = 0; i < n; i++) {
        var index = Math.floor(n * arr[i]);
        result[index].push(arr[i]);
    }
    return result;
};

var sortBuckets = function(buckets) {
    for (var i = 0; i < buckets.length; i++) {
        buckets[i] = insertionSort(buckets[i]);
    }
    return buckets;
};

var bucketSort = function(arr) {
    var buckets = sortBuckets(distributeOverBuckets(arr));
    var sorted = [];
    for (var i = 0; i < buckets.length; i++) {
        sorted = sorted.concat(buckets[i]);

    }
    return sorted;
}

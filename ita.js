
var isSorted = function(arr) {

    var last;
    for (var i = 0; i < arr.length; i++) {
        if (last != undefined && arr[i] < last) {
            return false;
        }
        last = arr[i];
    }
    return true;
};

var randomArray = function(n, min, max) {

    var arr = new Array(n);
    for (var i = 0; i < n; i++) {
        arr[i] = Math.floor(Math.random() * (max - min + 1)) + min;
    }
    return arr;
};

var swapVariables = function(arr, i, j) {
    var tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
};

var insertionSort = function(arr) {

    var arr = arr.slice(0);
    for (var j = 1; j < arr.length; j++) {
        var key = arr[j];
        var i = j - 1;
        while (i >= 0 && arr[i] > key) {
            arr[i + 1] = arr[i];
            i--;
        }
        arr[i + 1] = key;
    }
    return arr;
};


var mergeSort = function(arr) {

    var arr = arr.slice(0);
    var merge = function(p, q, r) {

        var left = arr.slice(p, q + 1)
        var right = arr.slice(q + 1, r + 1);

        left[left.length] = Number.POSITIVE_INFINITY;
        right[right.length] = Number.POSITIVE_INFINITY;

        var i = 0;
        var j = 0;

        for (var k = p; k <= r ; k++) {
            if (left[i] <= right[j]) {
                arr[k] = left[i];
                i++;
            } else {
                arr[k] = right[j];
                j++;
            }
        }
    };

    var mergeHelp = function(p, r) {

        if (p < r) {
            var q = Math.floor((p + r) / 2.0);
            mergeHelp(p, q);
            mergeHelp(q + 1, r);
            merge(p, q, r);
        }
    }
    mergeHelp(0, arr.length - 1);
    return arr;
};


var bubbleSort = function(arr) {

    var arr = arr.slice(0);
    for (var i = 0; i < arr.length ; i++) {
        for (var j = arr.length - 1; j > i; j--) {
            if (arr[j] < arr[j - 1]) {
                swapVariables(arr, j, j - 1);
            }
        }
    }
    return arr;
};


var makeMaxSubArrayResult = function(maxLeft, maxRight, sum) {
    return {maxLeft: maxLeft, maxRight: maxRight, sum: sum}
};

var findMaxCrossingSubArray = function(arr, low, mid, high) {

    if (arr.length < 2) {
        throw "Array should have at least two elements";
    }
    if (mid >= high) {
        throw "Mid should be lower than high";
    }
    if (mid < low) {
        throw "Mid should be equal to or higher than low";
    }
    if (high >= arr.length) {
        throw "Indices should be in range";
    }
    if (low < 0) {
        throw "Indices should be in range";
    }

    var leftSum = Number.NEGATIVE_INFINITY;
    var sum = 0;
    var maxLeft = undefined;

    for (var i = mid; i >= low; i--) {
        sum += arr[i];
        if (sum > leftSum) {
            leftSum = sum;
            maxLeft = i;
        }
    }

    var rightSum = Number.NEGATIVE_INFINITY;
    sum = 0;
    var maxRight = undefined;

    for (var j = mid + 1; j <= high; j++) {
        sum += arr[j];
        if (sum > rightSum) {
            rightSum = sum;
            maxRight = j;
        }
    }
    return makeMaxSubArrayResult(maxLeft, maxRight, rightSum + leftSum);
};

var findMaxSubArray = function(arr) {
    var findMaxSubArrayHelper = function(low, high) {
        if (low == high) {
            return makeMaxSubArrayResult(low, high, arr[low]);
        }
        var mid = Math.floor((low + high) / 2.0);

        leftMaxSub = findMaxSubArrayHelper(low, mid);
        rightMaxSub = findMaxSubArrayHelper(mid + 1, high);
        crossMaxSub = findMaxCrossingSubArray(arr, low, mid, high);

        if (leftMaxSub.sum >= rightMaxSub.sum && leftMaxSub.sum >= crossMaxSub.sum) {
            return leftMaxSub;
        }
        else if (rightMaxSub.sum >= leftMaxSub.sum && rightMaxSub.sum >= crossMaxSub.sum) {
            return rightMaxSub;
        }
        return crossMaxSub;
    }
    return findMaxSubArrayHelper(0, arr.length - 1);
};


var squareMatrixMultiply = function(matrixA, matrixB) {
    var n = matrixA.length;

    matrixC = new Array(n);

    for (var i = 0; i < n; i++) {
        matrixC[i] = new Array(n);
        for (var j = 0; j < n; j++) {
            matrixC[i][j] = 0;
            for (var k = 0; k < n; k++) {
                matrixC[i][j] += matrixA[i][k] * matrixB[k][j];
            }
        }
    }
    return matrixC;
};


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
        swapVariables(arr, i, rnd);
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
        largest = (l < self.length && self.array[l] > self.array[index]) ? l : index;
        largest = (r < self.length && self.array[r] > self.array[largest]) ? r : largest;
        if (largest != index) {
            swapVariables(self.array, index, largest);
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
            swapVariables(arr, 0, i);
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
            swapVariables(heap.array, index, heap.parent(index));
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


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
                var tmp = arr[j];
                arr[j] = arr[j - 1];
                arr[j - 1] = tmp;
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
        var tmp = arr[i];
        var rnd = Math.floor(randomFunction() * (n - i)) + i;
        arr[i] = arr[rnd];
        arr[rnd] = tmp;
    }
    return arr;
};


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
            var q = Math.floor((p + r) / 2);
            mergeHelp(p, q);
            mergeHelp(q + 1, r);
            merge(p, q, r);
        }
    }
    mergeHelp(0, arr.length - 1);
    return arr;
};

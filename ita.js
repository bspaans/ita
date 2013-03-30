
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

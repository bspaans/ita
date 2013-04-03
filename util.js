var Util = {}


Util.isSorted = function(arr) {

    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == undefined || arr[i] < arr[i - 1]) {
            return false;
        }
    }
    return true;
};


Util.randomArray = function(n, min, max) {

    var arr = new Array(n);
    for (var i = 0; i < n; i++) {
        arr[i] = Util.randRange(min, max);
    }
    return arr;
};


Util.randRange = function(min, max) {

    return Math.floor(Math.random() * (max - min + 1)) + min;
};


Util.swapVariables = function(arr, i, j) {

    var tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
};

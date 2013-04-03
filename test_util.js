var fuzzTestSortFunction = function(sortFunction, nrOfRuns, nrOfElems) {

    var nrOfElems = nrOfElems == undefined ? 100 : nrOfElems;
    for (var i = 0; i < nrOfRuns; i++) {
        var arr = Util.randomArray(nrOfElems, 0, 100);
        var sorted = sortFunction(arr);
        ok(Util.isSorted(sorted));
    }
};

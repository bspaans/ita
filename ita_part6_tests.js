module("Introduction to Algorithms - Part VI - chapter 22.1");

test("I can find the neighbours of a vertex in an adjacency list graph", function() {

    var graph = new AdjacencyListGraph();
    graph.addEdge('A', 'B');
    graph.addEdge('B', 'C');

    var neighbours = graph.getNeighbours('B');
    ok($.inArray('A', neighbours) != -1)
    ok($.inArray('C', neighbours) != -1)
    
    var neighbours = graph.getNeighbours('A');
    ok($.inArray('B', neighbours) != -1)

    var neighbours = graph.getNeighbours('C');
    ok($.inArray('B', neighbours) != -1)
});

test("I can find the neighbours of a vertex in an adjacency matrix graph", function() {

    var graph = new AdjacencyMatrixGraph();
    graph.addEdge('A', 'B');
    graph.addEdge('B', 'C');

    var neighbours = graph.getNeighbours('B');
    ok($.inArray('A', neighbours) != -1)
    ok($.inArray('C', neighbours) != -1)
    
    var neighbours = graph.getNeighbours('A');
    ok($.inArray('B', neighbours) != -1)

    var neighbours = graph.getNeighbours('C');
    ok($.inArray('B', neighbours) != -1)
});

test("I can find the neighbours of a vertex in a graph", function() {

    var vertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
    var edges = {};
    var graph = new AdjacencyListGraph();
    $.each(vertices, function(index, value) {
        edges[value] = {};
        for (var j = 0; j < index; j++) {
            var edgeExists = Math.random() < 0.5;
            edges[value][vertices[j]] = edgeExists;
            if (edgeExists && index != j) {
                graph.addEdge(value, vertices[j]);
            }
        }
    });

    $.each(vertices, function(index, value) {
        var neighbours = graph.getNeighbours(value);
        $.each(vertices, function(index, value2) {
            var isSaidToBeNeighbour = $.inArray(value2, neighbours) != -1;
            var shouldBeNeighbour = (edges[value][value2] === true || edges[value2][value] === true);
            ok(isSaidToBeNeighbour == shouldBeNeighbour, value2 + ' should be in ' + neighbours + 
                ' is ' + shouldBeNeighbour + ', and was said to be ' + isSaidToBeNeighbour);
        });
    });
});

module("Introduction to Algorithms - Part VI - chapter 22.2");

var getGraphForTesting = function () {

    //          DUB----\      
    //           |      >--AMS
    //          SOU----/
    //           |---------ORL
    //
    var graph = new AdjacencyListGraph();
    graph.addEdge('ORL', 'SOU');
    graph.addEdge('SOU', 'AMS');
    graph.addEdge('AMS', 'DUB');
    graph.addEdge('SOU', 'DUB');
    return graph;
}

test("I can do a breadth first search for vertex v on an adjacency list matrix and get the distances for each vertix that has a path to v", function() {

    var graph = getGraphForTesting();
    var bfsResult = graph.breadthFirstSearch('ORL');
    var distance = bfsResult.distances;
    equal(distance['ORL'], 0);
    equal(distance['SOU'], 1);
    equal(distance['DUB'], 2);
    equal(distance['AMS'], 2);
});

test("I can do a breadth first search for vertex v on an adjacency list matrix and get the predecessors for each vertix that has a path to v", function() {

    var graph = getGraphForTesting();
    var bfsResult = graph.breadthFirstSearch('ORL');
    var predecessor = bfsResult.predecessors;
    equal(predecessor['ORL'], undefined);
    equal(predecessor['SOU'], 'ORL');
    equal(predecessor['DUB'], 'SOU');
    equal(predecessor['AMS'], 'SOU');
});

test("I can get a shortest path between two vertices in an adjacency list matrix", function() {

    var graph = getGraphForTesting();

    var shortestPath = graph.shortestPath('ORL', 'SOU');
    deepEqual(shortestPath, ['ORL', 'SOU']);

    var shortestPath = graph.shortestPath('ORL', 'DUB');
    deepEqual(shortestPath, ['ORL', 'SOU', 'DUB']);

    var shortestPath = graph.shortestPath('ORL', 'AMS');
    deepEqual(shortestPath, ['ORL', 'SOU', 'AMS']);

    var shortestPath = graph.shortestPath('SOU', 'AMS');
    deepEqual(shortestPath, ['SOU', 'AMS']);

    var shortestPath = graph.shortestPath('DUB', 'ORL');
    deepEqual(shortestPath, ['DUB', 'SOU', 'ORL']);
});

module("Introduction to Algorithms - Part VI - chapter 22.3");

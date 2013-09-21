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
    for (var i = 0 ; i < vertices.length; i++) {
        edges[vertices[i]] = {}
        for (var j = 0; j < i; j++) {
            var edgeExists = Math.random() < 0.5;
            edges[vertices[i]][vertices[j]] = edgeExists;
            if (edgeExists && i != j) {
                console.log(i + ", " + j)
                graph.addEdge(vertices[i], vertices[j]);
            }
        }
    }

    for (var i = 0 ; i < vertices.length; i++) {
        var neighbours = graph.getNeighbours(vertices[i]);
        for (var j = 0; j < vertices.length; j++) {
            if (edges[vertices[i]][vertices[j]] || edges[vertices[j]][vertices[i]]) {
                ok($.inArray(vertices[j], neighbours) != -1, vertices[j] + ' should be in ' + neighbours);
            } else {
                ok($.inArray(vertices[j], neighbours) == -1);
            }
        }
    }
});

module("Introduction to Algorithms - Part III - chapter 10.1");


test("I can test if a stack is empty", function() {

    var stack = new Stack();
    ok(stack.isEmpty());

    var stack = new Stack([1,2,3]);
    ok(!stack.isEmpty());
});

test("I can push an item onto the stack", function() {

    var stack = new Stack();
    stack.push(1);

    deepEqual(stack.array, [1]);
});

test("I can pop an item from the stack", function() {

    var stack = new Stack([1]);
    equal(stack.pop(), 1);

    var stack = new Stack([1,2,3]);
    equal(stack.pop(), 3);
    equal(stack.pop(), 2);
    equal(stack.pop(), 1);
});

test("I can't pop an item from an empty stack", function() {

    var stack = new Stack([1]);
    equal(stack.pop(), 1);
    throws(function() { stack.pop(); }, /Stack underflow/);
});


test("I can enqueue an item into a Queue", function() {

    var queue = new Queue();
    queue.enqueue(1);
    queue.enqueue(2);
    deepEqual(queue.array, [1,2]);
});

test("If I enqueue an item into a Queue that is full it will be inserted at the beginning", function() {

    var queue = new Queue(2);
    queue.enqueue(1);
    queue.enqueue(2);
    deepEqual(queue.array, [1,2]);
    queue.enqueue(3);
    deepEqual(queue.array, [3,2]);
});

test("I can dequeue an item from a Queue", function() {

    var queue = new Queue(2);
    queue.enqueue(1);
    queue.enqueue(2);
    equal(queue.dequeue(), 1);
    equal(queue.dequeue(), 2);
    queue.enqueue(3);
    equal(queue.dequeue(), 3);
    equal(queue.dequeue(), undefined);
});


module("Introduction to Algorithms - Part III - chapter 10.2");

test("I can insert a value into a linked list, and keep head and next attributes in a correct state", function() {

    var ll = new LinkedList();
    equal(ll.key, null);
    equal(ll.next, null);

    var item1 = ll.insert(5);
    equal(item1.head(), item1);
    equal(ll.head(), item1);
    equal(item1.key, 5);
    equal(item1.next.key, null);
    
    var item2 = ll.insert(6);
    equal(item2.head(), item2);
    equal(item1.head(), item2);
    equal(ll.head(), item2);

    equal(item2.key, 6);
    equal(item2.next.key, 5);
    equal(item2.next.next.key, null);
});


test("I can insert on any instance of a singly linked list, but the element will always be added at the head", function() {

    var ll = new LinkedList();
    equal(ll.key, null);
    var item1 = ll.insert(5);
    var item2 = item1.insert(6);
    equal(item2.head(), item2);
    equal(item1.head(), item2);
    equal(ll.head(), item2);

    equal(item2.key, 6);
    equal(item2.next.key, 5);
    equal(item2.next.next.key, null);
});

test("I can search for a key in a singly linked list", function() {

    var ll = new LinkedList(5);
    var item1 = ll.insert(6);
    var item2 = ll.insert(7);

    equal(item2.search(5), ll);
    equal(item1.search(7), item2);
    equal(ll.search(6), item1);
});

test("If I search for an item that doesn't exist, I get a null value", function() {

    var ll = new LinkedList(5);
    var item1 = ll.insert(6);
    var item2 = ll.insert(7);

    equal(item2.search(9000), null);
});

test("I can delete an item from a linked list", function() {

    var ll = new LinkedList(5);
    ll.insert(6);
    equal(ll.delete(5), 1);
    equal(ll.search(5), null);
    equal(ll.delete(5), 0);
    equal(ll.delete(6), 1);
    equal(ll.search(6), null);
});

test("I can insert objects with a key into a linked list, and query on key to get back that data", function() {

    var item1 = {key: 1, value: "first"};
    var item2 = {key: 2, value: "second"};
    var item3 = {key: 3, value: "third"};

    var ll = new LinkedList();
    var ll1 = ll.insert(item1);
    var ll2 = ll.insert(item2);
    var ll3 = ll.insert(item3);

    equal(ll.search(1), ll1);
    equal(ll.search(2), ll2);
    equal(ll.search(3), ll3);

    equal(ll.search(1).data, item1);
    equal(ll.search(2).data, item2);
    equal(ll.search(3).data, item3);
});

test("I can delete objects that have a key", function() {

    var item1 = {key: 1, value: "first"};
    var item2 = {key: 2, value: "second"};
    var item3 = {key: 3, value: "third"};

    var ll = new LinkedList();
    var ll1 = ll.insert(item1);
    var ll2 = ll.insert(item2);
    var ll3 = ll.insert(item3);

    equal(ll.search(1), ll1);
    equal(ll.search(2), ll2);
    equal(ll.search(3), ll3);

    ll.delete(item1);
    ll.delete(item2);
    ll.delete(item3);

    equal(ll.search(1), null);
    equal(ll.search(2), null);
    equal(ll.search(3), null);
});

test("I can delete objects on key", function() {

    var item1 = {key: 1, value: "first"};
    var item2 = {key: 2, value: "second"};
    var item3 = {key: 3, value: "third"};

    var ll = new LinkedList();
    var ll1 = ll.insert(item1);
    var ll2 = ll.insert(item2);
    var ll3 = ll.insert(item3);

    equal(ll.search(1), ll1);
    equal(ll.search(2), ll2);
    equal(ll.search(3), ll3);

    ll.delete(1);
    ll.delete(2);
    ll.delete(3);

    equal(ll.search(1), null);
    equal(ll.search(2), null);
    equal(ll.search(3), null);
});

test("I can get the size of singly linked list", function() {

    var ll = new LinkedList();
    equal(ll.size(), 0);

    var ll1 = ll.insert(100);
    equal(ll.size(), 1);
    var ll2 = ll.insert(200);
    equal(ll.size(), 2);
    var ll3 = ll.insert(300);
    equal(ll.size(), 3);

    ll.delete(100);
    equal(ll.size(), 2);
});

test("I can insert a value into a doubly linked list, and keep head, next and prev attributes in a correct state", function() {

    var ll = new DoublyLinkedList();
    equal(ll.key, null);
    equal(ll.next, null);
    equal(ll.prev, null);

    var item1 = ll.insert(5);
    equal(ll.head(), item1);
    equal(ll.key, null);
    equal(ll.next, null);
    equal(ll.prev, item1);

    equal(item1.head(), item1);
    equal(item1.key, 5);
    equal(item1.next, ll);
    equal(item1.prev, null);
    
    var item2 = ll.insert(6);
    equal(item2.head(), item2);
    equal(item1.head(), item2);
    equal(ll.head(), item2);
    
    equal(item1.next, ll);
    equal(item1.prev, item2);

    equal(item2.key, 6);
    equal(item2.next, item1);
    equal(item2.prev, null);
});

test("I can search for a key in a doubly linked list", function() {

    var ll = new DoublyLinkedList(5);
    var item1 = ll.insert(6);
    var item2 = ll.insert(7);

    equal(item2.search(5), ll);
    equal(item1.search(7), item2);
    equal(ll.search(6), item1);
});

test("If I search for an item that doesn't exist, I get a null value", function() {

    var ll = new DoublyLinkedList(5);
    var item1 = ll.insert(6);
    var item2 = ll.insert(7);

    equal(item2.search(9000), null);
});

test("I can delete an item from a doubly linked list", function() {

    var ll = new DoublyLinkedList(5);
    ll.insert(6);
    equal(ll.delete(5), 1);
    equal(ll.search(5), null);
    equal(ll.delete(5), 0);
    equal(ll.delete(6), 1);
    equal(ll.search(6), null);
});

test("I can insert objects with a key into a doubly linked list, and query on key to get back that data", function() {

    var item1 = {key: 1, value: "first"};
    var item2 = {key: 2, value: "second"};
    var item3 = {key: 3, value: "third"};

    var ll = new DoublyLinkedList();
    var ll1 = ll.insert(item1);
    var ll2 = ll.insert(item2);
    var ll3 = ll.insert(item3);

    equal(ll.search(1), ll1);
    equal(ll.search(2), ll2);
    equal(ll.search(3), ll3);

    equal(ll.search(1).data, item1);
    equal(ll.search(2).data, item2);
    equal(ll.search(3).data, item3);
});

test("I can delete objects that have a key", function() {

    var item1 = {key: 1, value: "first"};
    var item2 = {key: 2, value: "second"};
    var item3 = {key: 3, value: "third"};

    var ll = new DoublyLinkedList();
    var ll1 = ll.insert(item1);
    var ll2 = ll.insert(item2);
    var ll3 = ll.insert(item3);

    equal(ll.search(1), ll1);
    equal(ll.search(2), ll2);
    equal(ll.search(3), ll3);

    ll.delete(item1);
    ll.delete(item2);
    ll.delete(item3);

    equal(ll.search(1), null);
    equal(ll.search(2), null);
    equal(ll.search(3), null);
});

test("I can delete objects on key", function() {

    var item1 = {key: 1, value: "first"};
    var item2 = {key: 2, value: "second"};
    var item3 = {key: 3, value: "third"};

    var ll = new DoublyLinkedList();
    var ll1 = ll.insert(item1);
    var ll2 = ll.insert(item2);
    var ll3 = ll.insert(item3);

    equal(ll.search(1), ll1);
    equal(ll.search(2), ll2);
    equal(ll.search(3), ll3);

    ll.delete(1);
    ll.delete(2);
    ll.delete(3);

    equal(ll.search(1), null);
    equal(ll.search(2), null);
    equal(ll.search(3), null);
});

test("I can get the size of a doubly linked list", function() {

    var ll = new DoublyLinkedList();
    equal(ll.size(), 0);

    var ll1 = ll.insert(100);
    equal(ll.size(), 1);
    var ll2 = ll.insert(200);
    equal(ll.size(), 2);
    var ll3 = ll.insert(300);
    equal(ll.size(), 3);

    ll.delete(100);
    equal(ll.size(), 2);
});

module("Introduction to Algorithms - Part III - chapter 11.1");

test("I have a dictionary interface", function() {

    var dict = new DictionaryInterface();
    throws(dict.insert, /Not implemented/);
    throws(dict.search, /Not implemented/);
    throws(dict.delete, /Not implemented/);
});

sanityTestDictionary = function(dict) {

    ok(dict.insert, "Should have an insert method");
    ok(dict.search, "Should have an search method");
    ok(dict.delete, "Should have an delete method");

    throws(function() { dict.insert({}); }, /Missing key property/, "Should only insert objects that have a key property");
    var item = {key:4, and: 'some', data: 'yeah'}
    deepEqual(dict.insert(item), item, "Should be able to insert");
    deepEqual(dict.search(4), item, "Should be able to search");

    dict.delete(4);
    deepEqual(dict.search(4), null, "Should be able to delete on key");

    dict.insert(item);
    deepEqual(dict.search(4), item);

    dict.delete(item);
    deepEqual(dict.search(4), null, "Should be able to delete on item");
}

fuzzTestDictionary = function(dict) {

    var testSize = 100;
    var items = new Array(testSize);
    for (var i = 0; i < testSize; i++) {
        items[i] = dict.insert({key: i, data: 'also: ' + i});
        ok(items[i], "I can insert items into a dictionary [item: " + i + "]");
    }

    for (var i = 0; i < testSize; i++) {
        deepEqual(dict.search(i), items[i], "I can search for a key");
    }

    for (var i = 0; i < testSize; i++) {
        if (i % 2 == 0) {
            dict.delete(i);
        }
    }

    for (var i = 0; i < testSize; i++) {
        if (i % 2 == 0) {
            deepEqual(dict.search(i), null, "I can delete on key");
        } else {
            deepEqual(dict.search(i), items[i]);
        }
    }

}

test("I can test a dictionary", function() {

    var DictionaryMock = function() {
        var self = new DictionaryInterface();
        var dict = {}
        self.insert = function(elem) {
            if (elem == undefined || elem.key == undefined) {
                throw "Missing key property";
            }
            dict[elem.key] = elem;
            return elem;
        }
        self.search = function(key) {
            return dict[key] == undefined ? null : dict[key];
        }
        self.delete = function(elem) {
            var key = elem.key == undefined ? elem : elem.key;
            delete dict[key];
        }
        return self;
    }
    sanityTestDictionary(new DictionaryMock());
    fuzzTestDictionary(new DictionaryMock());
});

test("I can insert an item into a direct access table and find it back", function() {

    var dict = new DirectAddressTable(10);
    
    var item1 = {key: 1, value: 'first'};
    var item2 = {key: 2, value: 'second'};

    dict.insert(item1);
    dict.insert(item2);

    equal(dict.search(1), item1);
    equal(dict.search(2), item2);
    equal(dict.search(3), null);

});

test("I can delete an item from a direct access table", function() {

    var dict = new DirectAddressTable(10);
    
    var item1 = {key: 1, value: 'first'};
    var item2 = {key: 2, value: 'second'};

    dict.insert(item1);
    dict.insert(item2);

    equal(dict.search(1), item1);
    equal(dict.search(2), item2);

    dict.delete(item1);
    dict.delete(item2);

    equal(dict.search(1), null);
    equal(dict.search(2), null);
});

test("Direct access tables passes the sanity checks", function() {

    sanityTestDictionary(new DirectAddressTable());
    fuzzTestDictionary(new DirectAddressTable());
});

module("Introduction to Algorithms - Part III - chapter 11.2");

test("I can insert an item into a hash table and find it back", function() {

    var dict = new HashTable(10);
    var called = 0;
    dict.hashFunction = function(n) { called++; return 1 }

    var item1 = {key: 1, value: 'first'};
    var item2 = {key: 2, value: 'second'};

    dict.insert(item1);
    dict.insert(item2);

    equal(called, 2, 'Hash function should be called');

    equal(dict.search(1), item1);
    equal(dict.search(2), item2);
    equal(dict.search(3), null);

    equal(called, 5, 'Hash function should be called');
});

test("I can delete an item from a hash table", function() {

    var dict = new HashTable();
    var called = 0;
    dict.hashFunction = function(n) { called++; return 1 }
    
    var item1 = {key: 1, value: 'first'};
    var item2 = {key: 2, value: 'second'};

    dict.insert(item1);
    dict.insert(item2);
    
    equal(called, 2, 'Hash function should be called');

    equal(dict.search(1), item1);
    equal(dict.search(2), item2);
    
    equal(called, 4, 'Hash function should be called');

    dict.delete(item1);
    dict.delete(item2);

    equal(called, 6, 'Hash function should be called');

    equal(dict.search(1), null);
    equal(dict.search(2), null);
});

test("Hash tables passes the sanity checks", function() {

    sanityTestDictionary(new HashTable());
    fuzzTestDictionary(new HashTable());
});

test("A hash table distributes items in roughly equally sized buckets", function() {

    var arrays = 10;
    var idealTestItemsPerSlot = 11;
    var generateItems = arrays * idealTestItemsPerSlot - 2;

    var unit = new HashTable(arrays);
    for (var i = 0; i < arrays; i++) {
        equal(unit.array[i].size(), 0);
    }

    for (var i = 0; i < generateItems; i++) {
        unit.insert({key: i});
    }

    var size = 0;
    for (var i = 0; i < arrays; i++) {
        size += unit.array[i].size();
    }
    equal(size, generateItems, "Size should work");


    var dataset = [];
    for (var i = 0; i < arrays; i++) {
        dataset[i] = unit.array[i].size();
    }

    var statistics = Util.getStatistics(dataset, undefined, idealTestItemsPerSlot);
    ok(Math.abs(statistics.mean - idealTestItemsPerSlot) < 1, "Mean should be no more than 1 away from ideal");
    ok(statistics.variance < 1, "Variance should be smaller than 1");
    ok(statistics.standardDeviation < 1, "Standard deviation should be smaller than one");
    ok(statistics.distanceFromPredictionInStdDevs <= 0.5);

    console.log(statistics);
});

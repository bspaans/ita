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

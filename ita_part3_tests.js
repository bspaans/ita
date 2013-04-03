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


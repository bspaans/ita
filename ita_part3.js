
var Stack = function(arr) {

    var self = this;
    self.array = arr == undefined ? [] : arr;
    self.top = self.array.length;

    self.isEmpty = function() {
        return self.top == 0;
    };

    self.push = function(item) {
        self.array[self.top++] = item;
    };

    self.pop = function() {
        if (self.isEmpty()) {
            throw "Stack underflow";
        }
        self.top--;
        return self.array[self.top];
    };

    return self;
};


var Queue = function(size) {

    var self = this;
    self.array = [];
    self.head = 0;
    self.tail = 0;
    self.size = size == undefined ? Number.POSITIVE_INFINITY : size;

    self.enqueue = function(item) {
        self.array[self.tail++] = item;
        if (self.tail == self.size) {
            self.tail = 0;
        }
    }

    self.dequeue = function() {
        var x = self.array[self.head];
        self.array[self.head++] = undefined;
        if (self.head == self.size) {
            self.head = 0;
        }
        return x;
    }

    return self;
};

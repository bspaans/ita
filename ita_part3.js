
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


var LinkedListHead = function() {
    this.item = null;
    return this;
}

var LinkedList = function(key, head) {

    var self = this;
    self.key = key == undefined ? null : key;
    self.headPointer = null;
    self.next = null;
    
    self.head = function() { 
        return self.headPointer == null ? null : self.headPointer.item; 
    }

    self.updateHead = function(newHead) {
        self.headPointer = self.headPointer == null ? new LinkedListHead() : self.headPointer;
        self.headPointer.item = newHead;
    }

    self.insert = function(elem) {
        var x = new LinkedList(elem);
        x.next = self.head();
        x.next = x.next == null ? self : x.next;
        self.updateHead(x);
        x.headPointer = self.headPointer;
        return x;
    }

    self.search = function(elem) {
        var x = self.head();
        while (x != null && x.key != elem) {
            x = x.next;
        }
        return x;
    }

    self.delete = function(elem) {
        var x = self.search(elem);
        return self.deleteLinkedList(x);
    }

    self.deleteLinkedList = function(x) {
        var elem = self.head();
        if (elem == x) {
            self.updateHead(elem.next);
            return 1;
        }
        var prev = null;
        while (elem != null) {
            if (elem == x) {
                prev.next = elem.next;
                return 1;
            } 
            prev = elem;
            elem = elem.next;
        }
        return 0;
    }

    return self;
};

var DoublyLinkedList = function(x) {

    var self = new LinkedList(x);
    self.prev = null;

    self.insert = function(elem) {
        var x = new DoublyLinkedList(elem);
        if (self.head() != null) {
            x.next = self.head();
            self.head().prev = x;
        } else {
            x.next = self;
            self.prev = x;
        }
        self.updateHead(x);
        x.headPointer = self.headPointer;
        return x;
    }

    self.delete = function(elem) {
        var x = self.search(elem);
        if (x == null) {
            return 0;
        }

        if (x.prev != null) {
            x.prev.next = x.next;
        } else {
            self.updateHead(x.next);
        }
        if (x.next != null) {
            x.next.prev = x.prev;
        }
        return 1;
    }

    return self;
}

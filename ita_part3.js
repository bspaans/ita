
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


var LinkedList = function(elem, head) {

    var LinkedListHead = function() {
        this.item = null;
        this.size = 0;
        return this;
    }

    var self = this;
    self.key = elem == undefined ? null : (elem.key != undefined ? elem.key : elem);
    self.data = elem != undefined &&  elem.key != undefined ? elem : null;
    self.headPointer = null;
    self.next = null;
    
    self.head = function() { 
        return self.headPointer == null ? null : self.headPointer.item; 
    }

    self.updateHead = function(newHead) {
        self.headPointer = self.headPointer == null ? new LinkedListHead() : self.headPointer;
        self.headPointer.item = newHead;
    }

    self.incrementSize = function() {
        self.headPointer.size++;
    }
    self.decrementSize = function() {
        self.headPointer.size--;
    }

    self.insert = function(elem) {
        var x = new LinkedList(elem);
        x.next = self.head();
        x.next = x.next == null ? self : x.next;
        self.updateHead(x);
        x.headPointer = self.headPointer;
        self.incrementSize();
        return x;
    }

    self.search = function(elem) {
        var x = self.head();
        while (x != null && x.key != elem) {
            x = x.next;
        }
        return x;
    }

    self.searchForData = function(elem) {
        var elem = self.search(elem);
        return elem == null ? null : elem.data;
    }

    self.delete = function(elem) {
        var key = elem.key == undefined ? elem : elem.key;
        var x = self.search(key);
        var result = self.deleteLinkedList(x);
        if (result) {
            self.decrementSize();
        }
        return result;
    }

    self.deleteLinkedList = function(x) {
        var elem = self.head();
        if (elem == x) {
            self.updateHead(elem.next);
            return true;
        }
        var prev = null;
        while (elem != null) {
            if (elem == x) {
                prev.next = elem.next;
                return true;
            } 
            prev = elem;
            elem = elem.next;
        }
        return false;
    }

    self.size = function() {
        return self.headPointer == null ? 0 : self.headPointer.size;
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
        self.incrementSize();
        return x;
    }

    self.delete = function(elem) {
        var key = elem.key == undefined ? elem : elem.key;
        var x = self.search(key);
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
        self.decrementSize();
        return 1;
    }

    return self;
}

var DictionaryInterface = function() {

    var self = this;

    self.insert = function(elem) { throw "Not implemented"; }
    self.search = function(key) { throw "Not implemented"; }
    self.delete = function(elem) { throw "Not implemented"; }

    self.getKey = function(elem) { 
        return elem == undefined || elem.key == undefined ? elem : elem.key;
    }

    return self;
}

var DirectAddressTable = function(size) {

    var self = new DictionaryInterface();
    
    var size = size == undefined ? 100 : size;
    self.array = new Array(size);

    self.insert = function(elem) {
        if (elem == undefined || elem.key == undefined) {
            throw "Missing key property";
        }
        self.array[elem.key] = elem;
        return elem;
    }
    self.search = function(key) {
        return self.array[key];
    }
    self.delete = function(elem) {
        self.array[self.getKey(elem)] = null;
    }
    return self;
}

var HashTable = function(size) {

    var self = new DirectAddressTable(size);
    for (var i = 0; i < self.array.length; i++) {
        self.array[i] = new DoublyLinkedList();
    }
    
    self.hashFunction = function(n) {
        return n % self.array.length;
    }

    self.insert = function(elem) {
        if (elem == undefined || elem.key == undefined) {
            throw "Missing key property";
        }
        self.array[self.hashFunction(elem.key)].insert(elem);
        return elem;
    }

    self.search = function(key) {
        return self.array[self.hashFunction(key)].searchForData(key);
    }

    self.delete = function(elem) {
        self.array[self.hashFunction(self.getKey(elem))].delete(elem);
    }

    return self;
}

var OpenAddressingHashTable = function(size) {

    var size = size == undefined ? 100 : size;
    var self = new DirectAddressTable(size);
    for (var i = 0; i < size; i++) {
        self.array[i] = null;
    }

    self.hashFunction = function(key, j) {
        return linearProbing(size, key, j);
    }

    self.insert = function(elem) {
        if (elem == undefined || elem.key == undefined) {
            throw "Missing key property";
        }
        for (var i = 0; i < size; i++) {
            var j = self.hashFunction(elem.key, i);
            if (self.array[j] == null || self.array[j].key == 'deleted') {
                self.array[j] = elem;
                return elem;
            } 
        }
        throw "Hash table overflow";
    }

    var findElement = function(elem) {
        var key = self.getKey(elem);
        for (var i = 0; i < size; i++) {
            var j = self.hashFunction(key, i);
            var obj = self.array[j];
            if (obj == null) { break; }
            if (obj.key == key) { return j; }
        }
        return -1;
    }

    self.search = function(elem) {
        var j = findElement(elem);
        return j == -1 ? null : self.array[j];
    }

    self.delete = function(elem) {
        var j = findElement(elem);
        if (j != -1) {
            self.array[j] = {key: 'deleted'};
        }
    }

    return self;
}

var linearProbing = function(size, key, index) {
    var h1 = key % size;
    return (h1 + index) % size;
};
var quadraticProbing = function(size, key, index, c1, c2) {
    var c1 = c1 === undefined ? 2 : c1;
    var c2 = c2 === undefined ? 3 : c2;
    var h1 = key % size;
    return (h1 + c1 * index + c2 * index * index) % size;
}
var doubleHashing = function(size, key, index) {
    var h1 = key % size;
    var h2 = key % size;
    return (h1 + index * h2) % size;
}

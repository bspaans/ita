# Introduction to Algorithms - 3rd edition


Trying to implement all the algorithms from the book in a test driven style,
using javascript, to get a better understanding of testing, algorithms and
(test driven) javascript.

## Findings so far:

* The algorithms in ItA are really terse and hard to TDD properly; by that I
  mean that it's often hard to break them up in testable, logical units. A lot
  of the algorithms either work or they don't; I've found this to be true for
  sorting algorithms in particular and am not really pleased with the way I 
  implemented mergeSort for example.
* Despite the previous point: writing tests firsts has certainly been
  beneficial. It reduced debugging time by huge amounts and has given me more
  confidence about the quality of the implementations. The pseudocode from the
  book can get confusing; especially the fact that they start arrays at 1,
  which subtly affect the code being written.
* Fuzz testing is great for algorithms. By writing a predicate and a random case
  generator you can cover a lot of ground quickly. It's not a replacement for 
  unit tests and covering all the corner cases, but it's really helpful to use 
  as a supplement.
* It's really hard to test or even TDD algorithms that use non-determinism.
  Even after mocking JavaScript's `Math.random`, it's too easy to write code
  that 'sort of' does the right thing.

## Possible improvements:

* Statistically check that the random permutations created by
  `permuteArrayBySorting` and `randomizeArrayInPlace` are uniform.


## Implemented algorithms:

### Part I - Foundations 

* Insertion sort 
* Merge sort 
* Bubble sort 
* Find maximum sub array 
* Square matrix multiply 
* Permute by sorting
* Randomize array in place

Skipped: 

* Strassen's algorithm for matrix multiplication

### Part II - Sorting and Order Statistics 

* Heaps and heap sort (max-heap)
* Priority queues (max-priority)
* Quick sort
* Randomized quick sort 
* Tail recursive quick sort 
* Counting sort 
* Bucket sort 
* Find minimum 
* Randomized select 

### Part III - Data Structures 

* Stacks
* Queues

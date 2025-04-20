> [!NOTE]
> Function along with its lexical scope bundled together is called a Closure.

Closures in JavaScript are functions that retain access to variables from their outer (enclosing) lexical scope even after the outer function has finished executing. This occurs because the inner function "closes over" the variables it references, preserving their environment. Here's a breakdown with examples:

### Key Concepts:

1. **Lexical Scoping**: Functions access variables from their parent scope.
    
2. **Closure Creation**: When an inner function is returned or passed elsewhere, it retains access to the outer scope's variables.
    
3. **Data Encapsulation**: Closures enable private variables and methods.
    

---
### Uses of Closures:

1. Modular Design Pattern
2. Currying
3. Functions like once
4. Memoize
5. Maintaining state in async world
6. setTimeouts
7. Iterators
8. and many more
    
### Example 1: Basic Closure



```js
function createGreeting(greeting) {
  return function(name) {
    console.log(`${greeting}, ${name}`);
  };
}

const sayHello = createGreeting("Hello");
sayHello("Alice"); // Output: "Hello, Alice"
```

- **Explanation**: `sayHello` is the inner function that retains access to the `greeting` parameter even after `createGreeting` has executed.
    

---

### Example 2: Counter with Private State



```js
function createCounter() {
  let count = 0;
  return {
    increment: () => ++count,
    getCount: () => count,
  };
}

const counter = createCounter();
counter.increment();
console.log(counter.getCount()); // Output: 1
```

- **Explanation**: `count` is private. Only `increment` and `getCount` can modify/access it via closure.
    

---

### Example 3: Closure in a Loop (Common Pitfall)

**Issue without Closure**:


```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // Output: 3, 3, 3
}
```

- **Why**: All `setTimeout` callbacks share the same `i` (var is function-scoped).
    

**Fix with Closure**: 



```js
for (var i = 0; i < 3; i++) {
  (function(j) {
    setTimeout(() => console.log(j), 100); // Output: 0, 1, 2
  })(i);
}
```

- **Explanation**: Immediately Invoked Function Expression (IIFE) captures the current `i` as `j` in each iteration.
    

---

### Example 4: Data Privacy


```js

function createPerson(name) {
  let age = 0;
  return {
    getName: () => name,
    getAge: () => age,
    setAge: (newAge) => age = newAge,
  };
}

const person = createPerson("Alice");
person.setAge(30);
console.log(person.getName(), person.getAge()); // Output: "Alice", 30

```
- **Explanation**: `name` and `age` are private; they can’t be accessed directly outside `createPerson`.
    

---

### Key Takeaways:

- **Use Cases**:
    
    - Encapsulating private data.
        
    - Factory functions (e.g., counters, timers).
        
    - Functional programming (e.g., currying).
        
- **Pitfalls**:
    
    - Accidental sharing of variables in loops (use `let` or IIFEs).
        
    - Memory leaks (closures retain references; free unused variables).
        
- **How It Works**:
    
    - The inner function retains a reference to its outer scope’s variables, preventing garbage collection.





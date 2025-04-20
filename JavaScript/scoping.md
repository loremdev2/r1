### What is Scope in JavaScript?

**Scope** determines where variables and functions are accessible in your code.

There are mainly **3 types of scope**:

- **Global Scope**
    
- **Function Scope**
    
- **Block Scope** (with `let` and `const`)
    

---

### 🔗 What is the Scope Chain?

The **scope chain** is how JavaScript _resolves variables_. When you try to access a variable, JavaScript looks:

1. In the **current scope**,
    
2. Then in the **outer scope**,
    
3. And continues outward until it reaches the **global scope**.
    

If it doesn’t find it anywhere, you get a `ReferenceError`.




### Example 1: Basic Scope Chain

```js
var a = "global";

function outer() {
  var b = "outer";

  function inner() {
    var c = "inner";
    console.log(a); // "global"
    console.log(b); // "outer"
    console.log(c); // "inner"
  }

  inner();
}

outer();

```

#### 🔍 What’s happening here?

- `inner()` can access `c`, `b`, and `a` because it sits inside both `outer()` and the global scope.
    
- That’s the **scope chain in action**: `inner → outer → global`.
    

---

### ⚠️ Example 2: Variable Not Found in Scope Chain


```js
function test() {
  console.log(x); // ReferenceError: x is not defined
}

test();

```

There is no `x` defined inside `test()` or outside in the global scope, so the scope chain fails.

---

### 🧱 Example 3: Block Scope with `let` and `const`



```js
let x = 10;

function example() {
  let y = 20;

  if (true) {
    let z = 30;
    console.log(x); // 10
    console.log(y); // 20
    console.log(z); // 30
  }

  console.log(z); // ReferenceError: z is not defined
}

example();

```

- Inside the `if` block, `z` is accessible.
    
- Outside the block, `z` is out of scope — `let` creates **block-level scope**.
    

---

### 🧠 Visualization of the Scope Chain

Think of it like a chain of boxes:


```js
Global Scope    
↓ 
outer() Scope    
↓ 
inner() Scope
```

If `inner()` needs a variable, it first checks **its own box**, then the **outer() box**, then the **global box**.

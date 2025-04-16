
In JavaScript, **variables** are used to store and manage data in your code. They act as containers (or "named storage") for values like numbers, strings, objects, functions, etc. Let’s break down how variables work in JavaScript:
### **1. Variable Declaration**

To create a variable, you need to **declare** it using one of these keywords:

- `var` (older way, function-scoped)
    
- `let` (modern way, block-scoped)
    
- `const` (modern way, block-scoped, and immutable)

```
var name = "Alice"; // Avoid using "var" in modern code
let age = 25;       // Use "let" for values that change
const PI = 3.14;    // Use "const" for values that won’t change
```


### **2. Key Differences Between `var`, `let`, and `const`**

|Feature|`var`|`let`|`const`|
|---|---|---|---|
|**Scope**|Function-scoped|Block-scoped|Block-scoped|
|**Re-declaration**|Allowed|Not allowed|Not allowed|
|**Reassignment**|Allowed|Allowed|Not allowed|
|**Hoisting**|Hoisted (to `undefined`)|Hoisted (but in TDZ*)|Hoisted (but in TDZ*)|

*TDZ = Temporal Dead Zone (cannot be accessed before declaration).


### **3. Variable Scope**

#### **Function Scope (`var`)**:

Variables declared with `var` are accessible anywhere within the function they’re declared in.

```
function example() {
  var x = 10;
  if (true) {
    var x = 20; // Same variable (no block scope)
  }
  console.log(x); // Output: 20
}
```

#### **Block Scope (`let`/`const`)**:

Variables declared with `let` or `const` are only accessible within the block (`{}`) they’re declared in.

```
if (true) {
  let y = 10;
  const z = 20;
}
console.log(y); // Error: y is not defined
console.log(z); // Error: z is not defined
```


### **4. Reassignment**

- `let` allows reassignment:
    

```
    let count = 1;
    count = 2; // Works
```

- `const` does **not** allow reassignment:


```
    const PI = 3.14;
    PI = 3.14159; // Error: Assignment to constant variable
```


**Note**: `const` only prevents reassignment, not mutation (e.g., objects/arrays can still be modified)


### **5. Hoisting**

Variables declared with `var` are **hoisted** to the top of their scope and initialized with `undefined`:

```
console.log(a); // Output: undefined (not an error)
var a = 5;
```

Variables declared with `let`/`const` are hoisted but remain in the **Temporal Dead Zone (TDZ)** until declared:

```
console.log(b); // Error: Cannot access 'b' before initialization
let b = 10;
```

### **6. Naming Rules**

- Variable names can include letters, digits, `_`, and `$`.
    
- They cannot start with a digit.
    
- Case-sensitive (`myVar` ≠ `myvar`).
    
- Avoid reserved keywords (e.g., `let`, `function`, `class`).
    

---

### **7. Best Practices**

1. Use `const` by default (prevents accidental reassignment).
    
2. Use `let` only when you need to reassign a variable.
    
3. Avoid `var` (it’s outdated and error-prone due to function scoping and hoisting).


---

### **Examples**

```
// Using const for fixed values
const API_KEY = "abc123";

// Using let for changing values
let score = 0;
score = 100;

// Block scope example
if (true) {
  let message = "Hello";
  console.log(message); // Output: "Hello"
}
console.log(message); // Error: message is not defined
```

### **Common Mistakes**

```

// 1. Re-declaring a variable with "let"
let x = 1;
let x = 2; // Error: Identifier 'x' has already been declared

// 2. Reassigning a "const" variable
const PI = 3.14;
PI = 3; // Error: Assignment to constant variable

// 3. Using "var" in loops (unintended behavior)
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i)); // Output: 3, 3, 3 (use "let" instead)
}
```

### **Summary**

- **Variables** store data and are declared with `let`, `const`, or `var`.
    
- Use `const` for constants and `let` for variables that change.
    
- Avoid `var` due to its quirks (function scoping, hoisting).
    
- Always initialize variables before use to avoid unexpected behavior.








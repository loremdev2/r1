 Hoisting is JavaScript’s default behavior of moving declarations to the top of their containing scope (either the global scope or a function scope) before code execution. It allows you to use variables and functions before they’re actually declared in your code—though the exact behavior depends on how they’re declared.

---

## 1. Variable Hoisting

### 1.1. `var`

- **What happens:** Only the declaration is hoisted; the initialization stays in place and defaults to `undefined` until the assignment runs.
    
- **Example:**
    
    
```js
console.log(a); // undefined  — the declaration `var a;` is hoisted
var a = 5;
console.log(a); // 5
```


    Internally, the engine treats it like:

```js
var a;
console.log(a); // undefined
a = 5;
console.log(a); // 5
```
### 1.2. `let` and `const`

- **What happens:** Declarations are hoisted but live in a _Temporal Dead Zone_ (TDZ) from the start of the scope until the actual line of declaration. Accessing them before declaration throws a `ReferenceError`.
    
- **Example with `let`:**
```
console.log(b); // ReferenceError: Cannot access 'b' before initialization
let b = 10;

```

- **Example with `const`:**
    
```js
console.log(c); // ReferenceError: Cannot access 'c' before initialization
const c = 20;

```
    
    `console.log(c); // ReferenceError: Cannot access 'c' before initialization const c = 20;`
    
- **Key point:** Unlike `var`, you cannot even see the variable name in your code before the declaration line.
    

---

## 2. Function Hoisting

### 2.1. Function Declarations

- **What happens:** Both the declaration _and_ its body are hoisted, so you can call them anywhere in their scope.
    
- **Example:**
    
```js
greet();          // "Hello!"
function greet() {
  console.log("Hello!");
}

```
### 2.2. Function Expressions & Arrow Functions

- **What happens:** These are treated like variables. If you use `var`, the variable name is hoisted (as `undefined`); if you use `let`/`const`, they’re in the TDZ.
    
- **Example with `var` + function expression:**
```js
speak();          // TypeError: speak is not a function
var speak = function() {
  console.log("Hi!");
};

```

    Here the engine sees:
    
```js
var speak;        // hoisted as undefined
speak();          // undefined() → TypeError
speak = function() { ... };

```
    
- **Example with `const` + arrow function:**

```js
shout();          // ReferenceError
const shout = () => {
  console.log("Hey!");
};

```

---

## 3. Class Hoisting (ES6+)

- **What happens:** Like `let`/`const`, class declarations are hoisted but cannot be accessed before they’re declared (you’ll hit a `ReferenceError`).
    
- **Example:**
```js
new Person();     // ReferenceError
class Person {
  constructor(name) {
    this.name = name;
  }
}

```

---

### Summary

|Declaration type|Hoisted?|Accessible before declaration?|
|---|---|---|
|`var` variable|yes (decl.)|yes, as `undefined`|
|`let` / `const` variable|yes (decl.)|no (Temporal Dead Zone → `ReferenceError`)|
|Function declaration|yes (decl. + body)|yes|
|Function expression (var)|yes (decl.)|yes, but as `undefined` (→ `TypeError`)|
|Function expression (let/const)|yes (decl.)|no (TDZ → `ReferenceError`)|
|Class declaration|yes (decl.)|no (TDZ → `ReferenceError`)|

Understanding hoisting helps prevent subtle bugs, especially around variable initialization timing and function availability.
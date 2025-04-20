**Garbage Collection (GC)** in JavaScript is the automatic process of managing memory by reclaiming space occupied by objects that are no longer in use. JavaScript engines handle this behind the scenes, so developers don’t need to manually allocate or free memory (unlike languages like C or C++).

---

### **How It Works**

JavaScript uses a **garbage collector** to identify and clean up "garbage" (objects/data that can’t be accessed anymore). The core idea is **reachability**:

- If an object is **reachable** (directly or indirectly referenced from the "root" like global variables or active function scopes), it’s kept in memory.
    
- If it’s **unreachable**, it’s garbage-collected.
    

Most modern engines (like V8 in Chrome/Node.js) use the **mark-and-sweep algorithm**:

1. **Mark**: Traverse all reachable objects starting from the root.
    
2. **Sweep**: Remove unmarked (unreachable) objects.
    

---

### **Examples**

#### 1. **Object Becomes Unreachable**

```js
let user = { name: "Alice" }; 
user = null; // The original { name: "Alice" } is now unreachable and will be GC'd.
```

#### 2. **Circular References**

```js
function createCycle() {
  let obj1 = {};
  let obj2 = {};
  obj1.ref = obj2;
  obj2.ref = obj1;
}
createCycle();
// After the function runs, obj1 and obj2 are unreachable (despite referencing each other).
// Modern GCs (mark-and-sweep) will clean them up.
```

#### 3. **Closures and Memory**

```js
function outer() {
  const largeData = new Array(1000000).fill("data"); // Large memory allocation
  return function inner() {
    console.log("Inner function");
  };
}
const innerFunc = outer(); 
// `largeData` is retained in memory because `innerFunc` has a closure over it.
// To free it: set innerFunc = null.
```

---

### **Common Memory Leaks to Avoid**

Even with GC, memory leaks can occur if you unintentionally keep references to objects. Examples:

1. **Forgotten Timers/Intervals**:
    
```js
    const intervalId = setInterval(() => {}, 1000);
    // Leak if not cleared with clearInterval(intervalId).
```
    
2. **Detached DOM Elements**:
    
```js
    let button = document.createElement("button");
    document.body.appendChild(button);
    document.body.removeChild(button); 
    // button is removed from DOM but still in memory if referenced elsewhere.
```
    
3. **Event Listeners**:

```js
    button.addEventListener("click", onClick);
    // Forgot to remove with removeEventListener? Leak if the button is removed.
```
    

---

### **Best Practices**

1. **Nullify References**: Set variables to `null` when done (e.g., `largeData = null`).
    
2. **Clean Up Event Listeners/Timers**: Use `removeEventListener`, `clearInterval`, etc.
    
3. **Avoid Closures for Large Data**: Be mindful of closures retaining unintended data.
    
4. **Use Weak References** (Advanced):
    
    
```js
    // WeakMap/WeakSet allow keys to be garbage-collected.
    const weakMap = new WeakMap();
    weakMap.set({ key: "obj" }, "value"); // Key is GC'd if no other references.
    
```

---

### **Key Takeaways**

- **Automatic**: JavaScript handles memory management for you.
    
- **Reachability**: Objects are removed only when **unreachable**.
    
- **Memory Leaks**: Often caused by lingering references (timers, detached DOM, etc.).
    
- **Tools**: Use browser DevTools (e.g., Chrome’s Memory tab) to profile memory usage.
    


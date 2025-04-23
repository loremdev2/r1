
> [!NOTE] 
> Whenever you run any javascript code, global execution context is created and pushed in call stack

[Youtube](https://www.youtube.com/watch?v=8zKuNo4ay8E&t=837s)

[What the heck is the event loop anyway? | Philip Roberts | JSConf EU ](https://www.youtube.com/watch?v=8aGhZQkoFbQ)

[Event Loop Visualizer](https://www.jsv9000.app/)
## 1. The Big Picture


1. **Call Stack**
    
    - Where your functions get pushed/popped as they execute (LIFO).
        
2. **Web APIs (in browsers)** / **Node APIs (in Node.js)**
    
    - Timers, DOM events, HTTP requests, etc.—things that run outside the JS engine.
        
3. **Callback Queues**
    
    - **Macrotask queue** (a.k.a. “task queue”): `setTimeout`, `setInterval`, I/O callbacks, etc.
        
    - **Microtask queue**: Promises (`.then`/`catch`), `queueMicrotask()`, `process.nextTick()` in Node.
        
4. **Event Loop**
    
    - Continuously: if call stack is empty, pull the next task (microtasks first, then macrotasks) and execute it.
        

---

## 2. Call Stack + Web APIs + Queues



```js
console.log('Start');

setTimeout(() => {
  console.log('Timeout callback');
}, 0);

Promise.resolve()
  .then(() => console.log('Promise callback'));

console.log('End');

```

**What happens?**

1. **Call stack**:
    
    - Push `console.log('Start')` → prints “Start” → pop.
        
    - Push `setTimeout(...)` → registers timer with Web API → pop immediately.
        
    - Push `Promise.resolve().then(...)` → schedules microtask → pop.
        
    - Push `console.log('End')` → prints “End” → pop.
        
2. **Stack empty** → Event Loop ticks:
    
    - **Microtasks first**: the `.then` callback runs → prints “Promise callback.”
        
    - **Then** macrotasks: the `setTimeout` callback runs → prints “Timeout callback.”
        

**Output order**:


`Start End Promise callback Timeout callback`

---

## 3. Microtasks vs. Macrotasks

|Queue|Examples|When Cleared|
|---|---|---|
|**Microtask**|`Promise.then`, `async/await` resumption, `queueMicrotask()`|After each macrotask, before next one|
|**Macrotask**|`setTimeout`, `setInterval`, DOM events|One per event‑loop turn|

**Key point**: any microtasks scheduled during the processing of other microtasks run in the same turn before you return to macrotasks.

---

## 4. Detailed Walk‑through Example


```js
console.log('A');

setTimeout(() => {
  console.log('B');
}, 0);

Promise.resolve()
  .then(() => {
    console.log('C');
    return Promise.resolve('D');
  })
  .then(msg => console.log(msg));

console.log('E');

```

**Step by step**:

1. Log “A” → call stack clear.
    
2. Schedule macrotask for “B”.
    
3. Schedule first Promise callback → microtask.
    
4. Log “E”.
    
5. **Event loop** empties call stack → run **all** microtasks:
    
    - First microtask: log “C”, schedule another microtask to log “D”.
        
    - Second microtask: log “D”.
        
6. **Then** run macrotasks: log “B”.
    

**Result**:

`A E C D B`

---


## Browser Rendering Pipeline & Event Loop Phases

Browsers generally interleave JavaScript execution with rendering work in these macro‑phases:

1. **Event Handling Phase**
    
    - Pull the next task (e.g. a DOM event like a click) and run its JS handler.
        
2. **Microtasks Phase**
    
    - After the task, drain all pending microtasks (Promise callbacks, `queueMicrotask`, etc.).
        
3. **Rendering Phase**
    
    - If layout or paint is “dirty,” recalculate styles, layout (reflow), paint pixels, composite layers to the screen.
        
    - Note: this only happens if the page is visible and something changed.
        

Then the loop repeats.

---

##  Where DOM APIs Fit

- **User‑interaction events** (click, keypress, scroll) are delivered into the **macrotask queue** (sometimes called the “task queue”).
    
- **`requestAnimationFrame` callbacks** go into a separate frame‑callback queue that’s executed just before the rendering phase.
    
- **CSS `transitionend` / `animationend`** events are dispatched as tasks after rendering completes.
    

---

##  Example: Click Handler + Promises + rAF + setTimeout


```HTML
`<button id="btn">Click me</button>`
```


```JS
const btn = document.getElementById('btn');

btn.addEventListener('click', () => {
  console.log('→ handler start');

  Promise.resolve()
    .then(() => console.log('   • promise in click'));

  requestAnimationFrame(() => {
    console.log('   • rAF callback');
  });

  setTimeout(() => {
    console.log('   • timeout callback');
  }, 0);

  console.log('← handler end');
});

```


**What happens when you click?**

1. **Event task**: the click handler runs (“→ handler start”, then “← handler end”).
    
2. **Microtasks**: the Promise callback runs (“• promise in click”).
    
3. **Frame callbacks** (before paint): the rAF runs (“• rAF callback”), then the browser paints any visual changes.
    
4. **Next task loop**: the `setTimeout` callback runs (“• timeout callback”).
    

**Console ordering on click:**

→ handler start   
← handler end      
• promise in click      
• rAF callback      
• timeout callback


### Starvation
A function (or callback) is **starved** when the event loop never gets to run it because some other code—either in the call stack or in the higher‑priority microtask queue—is perpetually busy. Keeping your long tasks chunked and respecting the macrotask vs. microtask priorities ensures a responsive app.

```js
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Event Loop Starvation Demo</title>
</head>
<body>
  <script>
    console.log("start");

    // 1) CPU (call‑stack) starvation:
    function blockFor(seconds) {
      const end = Date.now() + seconds * 1000;
      while (Date.now() < end) {
        // busy‑wait: nothing else can run during this loop
      }
    }

    // Schedule a macrotask
    setTimeout(() => {
      console.log("— Timeout callback (macrotask) —");
    }, 0);

    // Block the event loop for 2 seconds
    blockFor(2);
    console.log("… after 2s CPU block");

    // 2) Microtask starvation (commented out by default)
    function starveMacrotasks() {
      Promise.resolve().then(() => {
        console.log("→ microtask iteration");
        // schedule another microtask immediately
        starveMacrotasks();
      });
    }

    // ⚠️ WARNING: if you uncomment the next line you'll never see any macrotasks!
    // starveMacrotasks();

    // Promise microtask
    Promise.resolve().then(() => {
      console.log("— Promise callback (microtask) —");
    });

    console.log("end");
  </script>
</body>
</html>

```

## 5. Common Interview Questions

1. **What’s the difference between the call stack, web/API threads, callback queues, and the event loop?**
    
2. **Why does `setTimeout(fn, 0)` not execute immediately?**
    
3. **Explain microtasks vs. macrotasks. Give examples.**
    
4. **In what order do `setTimeout`, `Promise.then`, and `process.nextTick` run in Node?**
    
5. **How does `async/await` relate to Promises and the event loop?**
    
6. **What is `queueMicrotask()` and when would you use it?**
    
7. **How would you avoid starving the macrotask queue when scheduling large numbers of microtasks?**
    
8. **How does `requestAnimationFrame` fit into the event‑loop picture?**
    
9. **Explain how event delegation in the browser leverages the event loop.**
    
10. **What problems can arise from long‑running tasks on the call stack? How can you break them up?**
    

---

### Takeaway

- **Event loop** orchestrates JS’s single thread through call stack, Web/Node APIs, and task queues.
    
- **Microtasks** get priority over **macrotasks**.
    
- Understanding these details helps you write non‑blocking, performant code—and nails those tricky interview questions!



## Core Components of a JS Engine

1. **Parser**
    
    - **Tokenizer (Lexer)**: Reads raw source text and splits it into a stream of tokens (identifiers, operators, literals, etc.).
        
    - **AST Builder**: Consumes tokens to build an Abstract Syntax Tree (AST), a tree-shaped representation of the program’s structure (expressions, statements, function declarations).
    
2. **Interpreter / Ignition (in V8)**
    
    - **Bytecode Generator**: Transforms the AST into a lower-level, platform-independent bytecode.
        
    - **Bytecode Runner**: Executes bytecode instructions one at a time, managing the call stack and local variables.
    
3. **Just-In-Time (JIT) Compiler / TurboFan (in V8)**
    
    - **Profiler**: Monitors which functions or loops run “hot” (i.e. are executed frequently).
        
    - **Baseline Compiler**: Quickly compiles hot bytecode into unoptimized machine code.
        
    - **Optimizing Compiler**: Takes profiled information (types, shapes) and produces highly optimized machine code, inlining functions, unwrapping hidden classes, etc.
    
4. **Runtime & Memory Management**
    
    - **Call Stack**: Tracks active function calls in a LIFO manner.
        
    - **Memory Heap**: Manages object allocations.
        
    - **Garbage Collector**: Periodically reclaims memory that’s no longer reachable (e.g. generational GC: young vs. old generation).


## Step-by-Step Execution Flow

Let’s say you run:


```js
function add(a, b) {
  return a + b;
}

let result = add(2, 3);
console.log(result);

```

1. **Loading & Tokenizing**
    
    - Engine reads the script as a string.
        
    - **Lexer** produces tokens: `function`, `add`, `(`, `a`, `,`, `b`, … etc.
    
2. **Parsing → AST**
    
    - **Parser** constructs an AST:
```less
Program
├─ FunctionDeclaration (name: "add")
│   └─ Parameters: a, b
│   └─ ReturnStatement
│        └─ BinaryExpression (+)
├─ VariableDeclaration (result)
└─ ExpressionStatement (console.log)

```
    
3. **Bytecode Generation**
    
    - AST is traversed and compiled into bytecode instructions, e.g.:

```sql
LdaGlobal 'add'
CreateClosure [...]
StaGlobal 'add'
LdaSmi 2
LdaSmi 3
CallRuntime add
StaLocal 'result'
LdaGlobal 'console'
LoadNamedProperty 'log'
LdaLocal 'result'
CallProperty 1
Return

```

4. **Initial Interpretation**
    
    - The interpreter’s **Bytecode Runner** starts executing each bytecode, pushing and popping frames on the **call stack**.
        
    - At this stage, calls are relatively slow because every operation checks types at runtime.
    
5. **Profiling & Tier-Up**
    
    - As `add` and `console.log` get called, the **Profiler** marks them “hot.”
        
    - The Baseline Compiler compiles these to unoptimized machine code so future calls run faster.
    
6. **Optimization**
    
    - If `add` keeps getting invoked, the Optimizing Compiler uses runtime type feedback (e.g. “both args were integers”) to produce highly tuned machine code (e.g. direct integer addition without type checks).
    
7. **Garbage Collection**
    
    - Meanwhile, as objects and closures are created, the **Heap** grows.
        
    - Once thresholds are reached, the GC runs (e.g. mark-and-sweep in the young generation), reclaiming unreachable memory.
    
8. **Continued Execution**
    
    - Future calls to `add(2,3)` will jump straight into optimized machine code.
        
    - If code changes shape (e.g. you pass a string later), the engine may invalidate optimizations and fall back to bytecode or re-optimize.
    

---

### Why Each Part Matters

- **Parser & AST** let you write human-readable code, while giving the engine a structured model to analyze and transform.
    
- **Interpreter + JIT** balance fast startup (interpretation) with long-running performance (compilation).
    
- **Runtime & GC** handle memory safely and efficiently, so you rarely worry about manual allocation or leaks.


Understanding this pipeline helps you write code that plays nicely with JIT optimizations (e.g. avoiding overly dynamic object shapes, not mixing types in hot functions) and gives you insight into performance tuning and debugging deep engine behavior.
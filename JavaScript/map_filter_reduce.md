---

title: "JavaScript Array Methods: map, filter, reduce"
description: "Comprehensive guide with syntax and examples for .map(), .filter(), and .reduce()"
------------------------------------------------------------------------------------------------

# JavaScript Array Methods: map, filter, reduce

A quick reference to the three essential functional array methods in JavaScript—**map**, **filter**, and **reduce**—along with syntax, examples, and when to use each.

## Table of Contents

1. [`.map()` — Transform Each Element](#map--transform-each-element)
2. [`.filter()` — Keep Only What You Want](#filter--keep-only-what-you-want)
3. [`.reduce()` — Summarize / Accumulate / Combine](#reduce--summarize--accumulate--combine)
4. [Cheat Sheet](#cheat-sheet)

---

## 🗺️ `.map()` — Transform Each Element

Use `.map()` when you want to **transform** every item in an array into something else. It always returns a new array of the same length.

### 🔧 Syntax

```js
arr.map((item, index, array) => {
  // return transformed item
});
```

### ✅ Examples

**1. Add 1 to each number**

```js
const nums = [1, 2, 3, 4];
const incremented = nums.map(n => n + 1);
console.log(incremented); // [2, 3, 4, 5]
```

**2. Get full names from user objects**

```js
const users = [
  { firstname: "Sona", lastname: "Sam" },
  { firstname: "John", lastname: "Doe" }
];
const fullnames = users.map(user => `${user.firstname} ${user.lastname}`);
console.log(fullnames); // ["Sona Sam", "John Doe"]
```

---

## 🔍 `.filter()` — Keep Only What You Want

Use `.filter()` to **remove** elements from the array based on a condition. It returns a new array containing only the elements for which the callback returns `true`.

### 🔧 Syntax

```js
arr.filter((item, index, array) => {
  // return true to keep the item, false to discard
});
```

### ✅ Examples

**1. Keep only even numbers**

```js
const nums = [1, 2, 3, 4];
const evens = nums.filter(n => n % 2 === 0);
console.log(evens); // [2, 4]
```

**2. Users under age 30**

```js
const users = [
  { name: "Sona", age: 26 },
  { name: "Emily", age: 35 }
];
const youngUsers = users.filter(user => user.age < 30);
console.log(youngUsers); // [{ name: "Sona", age: 26 }]
```

---

## 🧮 `.reduce()` — Summarize / Accumulate / Combine

Use `.reduce()` to **boil down** an array into a single value—such as a sum, product, object, or any accumulated result.

### 🔧 Syntax

```js
arr.reduce((accumulator, currentValue, index, array) => {
  // compute and return updated accumulator
  return updatedAccumulator;
}, initialValue);
```

### ✅ Examples

**1. Sum of numbers**

```js
const nums = [1, 2, 3, 4];
const sum = nums.reduce((acc, curr) => acc + curr, 0);
console.log(sum); // 10
```

**2. Count users by age**

```js
const users = [
  { name: "Sona", age: 26 },
  { name: "Emily", age: 26 },
  { name: "Raj", age: 35 }
];
const countByAge = users.reduce((acc, user) => {
  acc[user.age] = (acc[user.age] || 0) + 1;
  return acc;
}, {});
console.log(countByAge); // { 26: 2, 35: 1 }
```

---

## Cheat Sheet

| Method   | Purpose                              | Returns                 |
| -------- | ------------------------------------ | ----------------------- |
| `map`    | Transform each element               | New array               |
| `filter` | Remove elements based on a condition | New array               |
| `reduce` | Combine all elements into one value  | Single value (any type) |

---

*Happy coding!* 🚀

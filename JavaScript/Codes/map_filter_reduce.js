const arr = [5, 1, 3, 2, 6];

const output = arr.map((a) => a * 2)

function numToBinary(num) {
    return num.toString(2);
}

console.log(output)
console.log(arr.map((n) => numToBinary(n)));

// Filter

const filter_1 = arr.filter((n) => n % 2 === 1)
console.log(filter_1);


// Reduce

console.log("Sum of elements of Array:", arr.reduce(function (acc, curr) {
    acc = acc + curr;
    return acc;
}, 0))

console.log("Sum of elements of Array:", arr.reduce((acc, curr) => acc + curr, 0))

console.log("Max Element in an Array:", arr.reduce((acc, curr) => (curr > acc ? curr : acc), -Infinity));

// map

const users = [
    { firstname: "Sona", lastname: "Sam", age: 26 },
    { firstname: "John", lastname: "Doe", age: 32 },
    { firstname: "Aisha", lastname: "Khan", age: 24 },
    { firstname: "Liam", lastname: "Smith", age: 22 },
    { firstname: "Emily", lastname: "Clark", age: 24 },
    { firstname: "Raj", lastname: "Patel", age: 28 },
    { firstname: "Chen", lastname: "Wei", age: 31 },
    { firstname: "Maria", lastname: "Garcia", age: 22 },
    { firstname: "David", lastname: "Nguyen", age: 22 },
    { firstname: "Fatima", lastname: "Ali", age: 27 }
];

const fullnames = (users.map((user) => user.firstname + " " + user.lastname))
console.log(fullnames)



// filter

const age_lessThan25 = users
    .filter((user) => (user.age < 25))
    .map((user) => (user.firstname + " " + user.lastname))

console.log(age_lessThan25)


// reduce
// { '22': 3, '24': 2, '26': 1, '27': 1, '28': 1, '31': 1, '32': 1 }
const same_age = users.reduce((acc, curr)=>{   // acc is users array , curr is like iterating value 
    if(acc[curr.age]){
        acc[curr.age]= ++acc[curr.age]
    }else{
        acc[curr.age]=1
    }

    return acc;
},{})

console.log(same_age)






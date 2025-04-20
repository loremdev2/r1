// Functions as Arguments
// Synchronous callback
function greet(name, callback) {
    console.log('Hello ' + name);
    callback(name);
}

function greetUser() {
    console.log('Welcome to the program!');
}

greet('Alice', greetUser); // Hello Alice Welcome to the program!


// Asynchronous callback
setTimeout(function () {
    console.log('This is an asynchronous callback after 2 seconds!');
}, 2000);

console.log('This message is displayed immediately!');



// 3. Event Listeneres
// Callbacks are used to handle events like clicks, key presses, etc.

function attachEventListener() {
    let count = 0;
    document.getElementById('myButton').addEventListener('click', function () {
        console.log('Button clicked!', ++count);
    });
}

attachEventListener();
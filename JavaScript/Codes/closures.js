/*
function x(){
    var a=10;
    function y(){
        console.log(a);
    }
    a=100;
    return y;
}

var z=x();

// console.log(z()); 
z();

*/


// function z(){
//     var b=900;
//     function x(){
//         var a=10;
//         function y(){
//             console.log(a,b);
//         }
//         y();
//     }
//     x();
// }
// z();


// Using clusures to setTimeout
// for (let i=0;i<5;i++){
//     setTimeout(function(){
//         console.log(i);
//     }, i*1000);
// }




// Here, let is block-scoped, so each iteration gets its own i. Closures are still at play—each timeout function closes over its version of i.
// function x(){
//       var i=1;
//       setTimeout(function(){
//             console.log(i);
//         }, 3000);
//         console.log("Hello World");
// }

// x();






// Here, var is function-scoped, so the same i is used for all iterations. The timeout functions close over the same i, which ends up being 6 after the loop completes.
// function x() {
//     for (var i = 1; i <= 5; i++) {  // var is function-scoped, so it will be the same i for all iterations
//         setTimeout(() => {
//             console.log(i);
//         }, i * 1000);
//     }
//     console.log("Hello World");
// }

// x();




// Here, let is block-scoped, so each iteration gets its own i. Closures are still at play—each timeout function closes over its version of i.
// function x() {
//     for (let i = 1; i <= 5; i++) {  // var is function-scoped, so it will be the same i for all iterations
//         setTimeout(() => {
//             console.log(i);
//         }, i * 1000);
//     }
//     console.log("Hello World");
// }

// x();




// Without using let

function x() {
    for (var i = 1; i <= 5; i++) {  // var is function-scoped, so it will be the same i for all iterations
        function close(i){
            setTimeout(() => {
                console.log(i);
            }, i * 1000);
        }
        close(i);
    }
    console.log("Hello World");
}

x();
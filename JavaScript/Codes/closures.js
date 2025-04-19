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

function z(){
    var b=900;
    function x(){
        var a=10;
        function y(){
            console.log(a,b);
        }
        y();
    }
    x();
}
z();


// Using clusures to setTimeout

for (let i=0;i<5;i++){
    setTimeout(function(){
        console.log(i);
    }, i*1000);
}

// Here, let is block-scoped, so each iteration gets its own i. Closures are still at play—each timeout function closes over its version of i.
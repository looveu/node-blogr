'use strict';

function fibo(n) {
  // console.log(n);
            return n > 1 ? fibo(n - 1) + fibo(n - 2) : 1;
        }

process.on('message', function(m) {
  var output = fibo(m.input);
  process.send(output);
});
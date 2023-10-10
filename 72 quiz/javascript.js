var app = app || {};

app.counter = (function() {
  let count = 0;

  function increment() {
    count++;
 }

  function getCount() {
    return count;
  }

  return {
    increment: increment,
    getCount: getCount
  };
})();

app.counter.increment();
console.log(app.counter.getCount());




app.counter2 = (function() {
  let counterCount = 0;

  function createCounter() {
    counterCount++;

    let count = 0;

  // SL - whats up with the indentation here?
  function increment() {
   count++;
  }

 function getCount() {
    return count;
  }

   return {
      increment: increment,
      getCount: getCount
     };
  }

  function getCounterCount() {
   return counterCount;
  }

  return {
    createCounter: createCounter,
    getCounterCount: getCounterCount
   };
})();
const aCounter = app.counter2.createCounter();
aCounter.increment();
console.log(aCounter.getCount());

const anotherCounter = app.counter2.createCounter();
anotherCounter.increment();
console.log(anotherCounter.getCount());
console.log(aCounter.getCount());

console.log(app.counter2.getCounterCount()); 


for (let i = 0; i < 9; i++) {
  app.counter.increment();
}

const counter1 = app.counter2.createCounter();
const counter2 = app.counter2.createCounter();

for (let i = 0; i < 5; i++) {
  counter1.increment();
}

for (let i = 0; i < 15; i++) {
  counter2.increment();
}



console.log("Counter from the first module:", app.counter.getCount());
console.log("Counter 1 from the second module:", counter1.getCount());
console.log("Counter 2 from the second module:", counter2.getCount());

// SL - quiz asked for 3 separate files, and all counter usage together in 3rd (but no real issue, just not exactly what was asked for...)

// Grade - 99.9

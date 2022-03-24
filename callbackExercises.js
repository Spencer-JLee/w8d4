class Clock {
  constructor() {
    // 1. Create a Date object.
    let date = new Date;
    this.hours = date.getHours();
    this.minutes = date.getMinutes();
    this.seconds = date.getSeconds();
    // 2. Store the hours, minutes, and seconds.
    // 3. Call printTime.
    this.printTime = this.printTime.bind(this);
    // 4. Schedule the tick at 1 second intervals.
    this._tick = this._tick.bind(this);

    this.printTime();
    this._tick();
  }

  printTime() {
    // Format the time in HH:MM:SS
    // Use console.log to print it.
    console.log(`${this.hours}:${this.minutes}:${this.seconds}`);
  }

  _tick() {
    // 1. Increment the time by one second.
    // 2. Call printTime.
    setInterval(() => {
      this.seconds += 1;
      if(this.seconds === 60){
        this.seconds = 0;
        this.minutes += 1;
        if(this.minutes === 60){
          this.minutes = 0;
          this.hours += 1;
          if(this.hours === 24){
            this.hours = 0;
          }
        }
      }
      this.printTime();
      this._tick.bind();
    }, 1000);
  }
}

// const clock = new Clock();

// const readline = require("readline");
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

function addNumbers(sum, numsLeft, completionCallback){
  if(numsLeft === 0){
    rl.close();
    completionCallback(sum);
  }
  else{
    rl.question('Please provide a number: ', answer => {
      number = parseInt(answer, 10);
      if (isNaN(number)) {
        number = 0;
      }
      sum += number;
      console.log(sum);
      addNumbers(sum, numsLeft - 1, completionCallback);
    });
  }
}

// addNumbers(0, 3, sum => console.log(`Total Sum: ${sum}`));

Function.prototype.myBind = function(context) {
  let func = (args) => { this.apply(context, args); };
  return func;
};

// class Lamp {
//   constructor() {
//     this.name = "a lamp";
//   }
// }

// const turnOn = function () {
//   console.log("Turning on " + this.name);
// };

// const lamp = new Lamp();

// turnOn(); // should not work the way we want it to

// const boundTurnOn = turnOn.bind(lamp);
// const myBoundTurnOn = turnOn.myBind(lamp);

// boundTurnOn(); // should say "Turning on a lamp"
// myBoundTurnOn(); // should say "Turning on a lamp"












// const readline = require("readline");
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });


const readline = require("readline");

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Write this first.
function askIfGreaterThan(el1, el2, callback) {
  // Prompt user to tell us whether el1 > el2; pass true back to the
  // callback if true; else false.
  reader.question(`Is ${el1} > ${el2}? `, answer => {
    if (answer === `yes`) { callback(true); }
    else { callback(false); }
  });
}



// askIfGreaterThan(2, 3, (isGreaterThan) => {
//   console.log(`${isGreaterThan}`);
//   });

// Once you're done testing askIfGreaterThan with dummy arguments, write this.
function innerBubbleSortLoop(arr, i, madeAnySwaps, outerBubbleSortLoop) {
  // Do an "async loop":
  // 1. If (i == arr.length - 1), call outerBubbleSortLoop, letting it
  //    know whether any swap was made.
  // 2. Else, use `askIfGreaterThan` to compare `arr[i]` and `arr[i +
  //    1]`. Swap if necessary. Call `innerBubbleSortLoop` again to
  //    continue the inner loop. You'll want to increment i for the
  //    next call, and possibly switch madeAnySwaps if you did swap.
  if (i == arr.length - 1) { outerBubbleSortLoop(madeAnySwaps); }
  else { askIfGreaterThan(arr[i], arr[i+1], (isGreaterThan) => {
    if (isGreaterThan) {
      let temp = arr[i+1];
      arr[i+1] = arr[i];
      arr[i] = temp;
      madeAnySwaps = true;
      innerBubbleSortLoop(arr, i+1, madeAnySwaps, outerBubbleSortLoop);
    }
    else{
      innerBubbleSortLoop(arr, i+1, madeAnySwaps, outerBubbleSortLoop);
    }
  }); }
}

// Once you're done testing innerBubbleSortLoop, write outerBubbleSortLoop.
// Once you're done testing outerBubbleSortLoop, write absurdBubbleSort.

function absurdBubbleSort(arr, sortCompletionCallback) {
  function outerBubbleSortLoop(madeAnySwaps) {
    // Begin an inner loop if you made any swaps. Otherwise, call
    // `sortCompletionCallback`.
    if(madeAnySwaps){
      innerBubbleSortLoop(arr, 0, false, outerBubbleSortLoop);
    }
    else{
      sortCompletionCallback(arr);
    }
  }
  outerBubbleSortLoop(true);
  // Kick the first outer loop off, starting `madeAnySwaps` as true.
}

absurdBubbleSort([3, 2, 1], function (arr) {
  console.log("Sorted array: " + JSON.stringify(arr));
  reader.close();
});






Function.prototype.myThrottle = function(interval) {
  let tooSoon = false;
  let func = (args) => {
    if (!(tooSoon)) {
      tooSoon = true;
      setTimeout( () => { tooSoon = false; }, interval );
      // setTimeout(tooSoon = false, interval);
      this(args);
    }
  };
  return func.bind(this);
};

// class Neuron {
//   fire() {
//     console.log("Firing!");
//   }
// }

// const neuron = new Neuron();

// neuron.fire = neuron.fire.myThrottle(500);

// const interval = setInterval(() => {
//   neuron.fire();
// }, 10);

Function.prototype.myDebounce = function(interval){
  // let beenLongEnoughForAuto = false;
  let timeoutID;
  let func = (args) => { 
    clearTimeout(timeoutID);
    timeoutID = setTimeout( (args) => { 
      this(args);
      this.myDebounce(args); 
    }, interval);
    // beenLongEnoughForAuto = false;
  };
  return func.bind(this);
};



class SearchBar {
  constructor() {
    this.query = "";

    this.type = this.type.bind(this);
    this.search = this.search.bind(this);
  }

  type(letter) {
    this.query += letter;
    this.search();
  }

  search() {
    console.log(`searching for ${this.query}`);
  }
}

const searchBar = new SearchBar();

const queryForHelloWorld = () => {
  searchBar.type("h");
  searchBar.type("e");
  searchBar.type("l");
  searchBar.type("l");
  searchBar.type("o");
  searchBar.type(" ");
  searchBar.type("w");
  searchBar.type("o");
  searchBar.type("r");
  searchBar.type("l");
  searchBar.type("d");
};

searchBar.search = searchBar.search.myDebounce(500);
queryForHelloWorld();
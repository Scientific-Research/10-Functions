"use strict";

/* -------------------------DEFAULT PARAMETERS---------------------------- */
console.log("---------------------DEFAULT PARAMETERS-----------------------");
// Some parameters are set by default and we don't need to chnage them manually when we want to keep them!

const bookings = [];
// We do the following in ES6: we give directly the values to the properties which is more nicer adn intuitive!
const createBooking = (
  flightNum,
  numPassengers = 1,
  // price can be calculated dynamically!
  price = 199 * numPassengers
) => {
  // const createBooking = (flightNum, numPassengers, price) => {
  // ES5 --------> but we don't use it anymore!----------------------------------
  // numPassengers = numPassengers || 1; // to assign the default values using || (OR operator). OR operator consider undefined as falsy value, that's why it goes to the next value and take that, when it is not a falsy value!

  // price = price || 199; // to assign the default values using || (OR operator)
  // ES5 --------> but we don't use it anymore!------------------------------------

  const booking = {
    // flightNum: flightNum, OR
    flightNum,
    // numPassengers: numPassengers, OR
    numPassengers,
    // price: price, OR
    price,
  };

  console.log(booking); // {flightNum: 'LH123', numPassengers: undefined, price: undefined}

  bookings.push(booking);
};

createBooking("LH123"); // takes the dafault values
createBooking("LH123", 2, 800); // overwrite the default values
createBooking("LH123", 2); // overwrite the default values
createBooking("LH123", 5); // overwrite the default values

// when we specify 'undefined', it will take our default value => in this case, it will take 1 as default value for number of passengers!
createBooking("LH123", undefined, 1000); // overwrite the default values

console.log(bookings);

/* HOW PASSING ARGUMENTS WORK => Values vs. References */
console.log("----HOW PASSING ARGUMENTS WORK => Values vs. References----");

const flight = "LH234";
const jonas = {
  name: "Jonas Schmedtmann",
  passport: 982375198456,
};

const checkIn = (flightNum, passenger) => {
  flightNum = "LH999";
  passenger.name = "Mr." + passenger.name;

  if (passenger.passport === 982375198456) {
    // alert("Checked in"); commented out to avoid of disturbing
  } else {
    // alert("Wrong passport!"); commented out to avoid of disturbing
  }
};

checkIn(flight, jonas);

console.log(jonas); // {name: 'Mr.Jonas Schmedtmann', passport: 982375198456}
console.log(flight); // LH234

// Is the same as doing...
// const flightNum = flight; // flight is just a primitive type(a string) and flightNum is a COPY of original value and simply not the ORIGINAL value! flightNum is a complete different variable and has nothing to do with the flight variable which is defined outside of the function!

// const passenger = jonas; // we changed the passenger name and the jonas object was affected too! why that happened? when we pass a reference type to a function, what is copied, is really just a reference to the object in heap memory, but the both points to the same object in the memory! that's why, when we are manipulating passenger object, is the same exactly as we manipulating the jonas object directly, because both of them points to the same object in the heap memory(both are the same object in the heap memory!) => what we change in the copy will happen in the original too! => WE HAVE TO BE AWARE OF THAT!!!!

// --------------------------------------A REAL EXAMPLE---------------------------------
console.log("---------------------A MORE REAL EXAMPLE-----------------------");

const newPassport = (person) => {
  person.passport = Math.trunc(Math.random() * 1000000000000000);
  console.log(person);
};

console.log(newPassport(jonas)); // Both are pointing to the same object in the heap memory when the jonas object is copied to the person object, taht's why every change in the person object will affect in the jonas object!

console.log(checkIn(flight, jonas)); // therefore, we have now jonas object with a different passport number and when we send it to the function will not adapt to the old passport number, therefore, the alert will gives us the 'Wrong passport!' message!

/* IS THERE ANY PASS BY REFERENCE OR PASS BY VALUE IN JS? */
// THERE IS ONLY PASS BY VALUE IN JS AND THERE IS NO PASS BY REFERENCE IN JS although we pass a reference to the function but this reference is also a VALUE which contains the memory address of the object! we pass A reference to the function but we do not pass BY reference and this is a VERY IMPORTANT DISTINCTION which happen in OTHER PROGRAMMING LANGUAGES LIKE C++!

/* ---------------------------HIGHER ORDER FUNCTION:---------------------------------- */
console.log("-----------------HIGHER ORDER FUNCTION--------------------------");
/* We create a function that accepts other function as input: */

// CREATING TWO GENERIC FUNCTIONS:
const oneWord = (str) => {
  return str.replaceAll(" ", "").toLowerCase();
  // return str.replace(/ /g, "").toLowerCase(); is the same but with regular expression!
};

const upperFirstWord = (str) => {
  const [first, ...others] = str.split(" "); // REST operator and Split operator!
  return [first.toUpperCase(), ...others].join(" "); // REST operator and join() operator!
};

// CREATING A HIGH-ORDER FUNCTION, because one of the parameter which it takes is a function(fn):
const transformer = (str, fn) => {
  console.log(`Original string: ${str}`); // Original string: Javascript is the best!
  console.log(`Transformed string: ${fn(str)}`); // Transformed string: JAVASCRIPT is the best!

  console.log(`Transformed by: ${fn.name}`); // It gives us the name of the function => Transformed by: upperFirstWord
};

// BOTH upperFirstWord AND oneWord ARE CALLBACK FUNCTIONS, BECAUSE WE DON'T CALL THEM NOW, RATHER, THE JS WILL CALL THEM LATER BACK, THAT'S WHY THEY ARE CALLED CALL BACK FUNCTIONS! CALL THEM BACK(LATER) HAPPENS IN LINES 109(fn(str)) IN WHICH fn() CAN BE EITHER upperFirstWord OR oneWord GENERIC FUNCTIONS!
transformer("Javascript is the best!", upperFirstWord);

transformer("Javascript is the best!", oneWord);
/* 
Original string: Javascript is the best!
Transformed string: javascriptisthebest!
Transformed by: oneWord
*/

// THIS IS EXACTLY THE SAME THAT WE HAD EARLIER WITH addEventListener() AS FOLLOWING:
const high5 = () => {
  console.log("👋"); // 👋 => as soon as we CLICK on the body, the high5 callback function will be called and we will see the waving hand on the console!
};

// addEventListener() which is high-order function is like transformer() and high5 is callback function like upperFirstWord or oneWord which will call back later by JS AS SOON AS WE CLICK ON THE BODY!

document.body.addEventListener("click", high5);

// ANOTHER EXAMPLE OF CALLBACK FUNCTION USING foreach() loop:
// ["Jonas", "Martha", "Adam"].forEach(high5);
["Jonas", "Martha", "Adam"].forEach(high5); // 3 👋 three times waving due to three element in the array! => for each of the element in the array, high5 callback function will be called!

// NOTE: JS uses callbacks all the time!

// LET'S DO THE OPPOSITE OF THE CALLBACK FUNCTION WHICH IS FUNCTION RETURNING FUNCTION:
console.log(
  "OPPOSITE OF THE CALLBACK FUNCTION => FUNCTION RETURNING NEW FUNCTION"
);

// BELOW, ONE ARROW FUNCTION RETURNS ANOTHER ARROW FUNCTION:
const greet = (greeting) => {
  // return a new arrow function
  return (name) => {
    console.log(`${greeting} ${name}`);
  };
};

// Our first function here(greet) returns a new function which is stored in greeterHey variable and then we can call this variable containing the new function with different parameters!
const greeterHey = greet("Hey");
greeterHey("Jonas"); // Hey Jonas
greeterHey("Steven"); // Hey Steven

// OR CALL ALL OF THEM IN ONE GO:
greet("Hallo")("Jonas");

// --------BACK TO this KEYWORD AND HOW CAN WE SET THAT MANUALLY-------
console.log("-----BACK TO this KEYWORD AND HOW CAN WE SET THAT MANUALLY-----");

// Defining a new object:
const lufthansa = {
  airline: "Lufthansa",
  iataCode: "LH",
  bookings: [],

  // book: function () {}, OR NEW ONE AS FOLLOWING: book(flightNum, name){} without function word!
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
    console.log(this.bookings);
  },
};

lufthansa.book(239, "Jonas Schmedtmann"); // Jonas Schmedtmann booked a seat on Lufthansa flight LH239
lufthansa.book(635, "John Smith"); // John Smith booked a seat on Lufthansa flight LH635
console.log(lufthansa);

// AFTER SOME YEARS LUFTHANSA GROUP CREATED A NEW AIRLINE:
const eurowings = {
  airline: "Eurowings",
  iataCode: "EW",
  bookings: [],
};

// OR WE CAN USE THE FIRST ORDER FUNCTION INSTEAD OF COPY PASTE THE BOOK METHOD FROM THE FIRST OBJECT:
const book = lufthansa.book; // THIS IS EQUAL WITH book(flightNum, name) {}

console.log("---------------------------call Method-----------------");
// THIS WILL NOT WORK -  WE USE call() to solve this problem - ist unten:
// book(23, "Sarah Williams"); // Cannot read properties of undefined (reading 'airline') BECAUSE this KEYWORD POINTS TO undefined!
// The book here is the regular book function and is not the book method anymore and in a regular function call, this keyword point to undefined!
// IT MEANS THE this KEYWORD DEPENDS HOW IT IS CALLED: WHEN INSIDE AN OBJECT IS CALLED, POINTS TO THE OBJECT ITSELF, BUT WHEN INSIDE A REGULAR FUNCTION IS CALLED, IT POINTS TO THE UNDEFINED!

// HOW TO SAY TO JS, WHEN I WANT TO BOOK A FLIGHT WITH LUFTHANSA, this KEYWORD REFER TO LAUFTHANSA OBJECT AND WHEN I WANT TO BOOK A FLIGHT WITH EUROWINGS, this KEYWORD REFERS TO THE EUROWINGS OBJECT:
// A function is an object and object has method, therefore a function can have method too and call method is one of them:
// the first argument is this keyword points to which object: Lufthansa or eurowings
// the second, third and other arguments are the rest arguments respectively!

// THIS WILL NOT WORK -  WE USE call() to solve this problem - ist unten:
// book(23, "Sarah Williams"); // Cannot read properties of undefined (reading 'airline') BECAUSE this KEYWORD POINTS TO undefined!

// MANUALLY MANUPULATING this KEYWORD USING call METHOD:
book.call(eurowings, 23, "Sarah Williams");
console.log(eurowings);

book.call(lufthansa, 239, "Mary Cooper");
console.log(lufthansa);

// Creating a new airline Object and call the book function and its method which is call!
const swiss = {
  airline: "Swiss Air Lines",
  iataCode: "LX",
  bookings: [],
};

book.call(swiss, 583, "Mary Cooper");
console.log(swiss);

console.log("---------------------------apply Method-----------------");
// A similar method to the call method which is called APPLY METHOD:
// APPLY METHOD does exactly the same like call method but it takes the arguments which come after OBJECT which is referring to this keyword as an ARRAY:
const flightData = [583, "George Cooper"];
book.apply(swiss, flightData);
console.log(swiss);

// NOTE: BUT WE DON'T USE THE APPLY METHOD IN MODERN JS ANYMORE.
// IN MODERN JS, WE USE STILL THE CALL METHOD PLUS SPREAD OPERATOR:
// We use spread operator to unpack the data from array and these data are exactly the arguments that we need after first argumnet!

book.call(swiss, ...flightData);
// this is exactly equal with this one: book.call(swiss, 583, "George Cooper");
console.log(swiss);

console.log("---------------------------Bind Method-----------------");
// Bind Method: is like call method, allow us to set manually the 'this' keyword for any function call!
// But Bind method doesn't not call the function immediately, instead it returns a new function, where the 'this' keyword is bond! It set to whatever value we set to Bind method!

// what we did already: book.call(eurowings, 23,'Sarah Williams');
const bookEW = book.bind(eurowings); // bind method create a new function with 'this' keyword set to eurowings!
// Bind Method WILL NOT CALL THE book FUNCTION, INSTEAD IT WILL RETURN A NEW FUNCTION IN WHICH THE 'this' KEYWORD IS ALWAYS SET TO THE eurowings!
// The bookEW is a variable which contains the book function, therefore is called function!
bookEW(23, "Steven Williams"); // This looks like a normal book function again! It includes already 'this' keyword and we no longer need to assign it again!

// THE OUTPUT: Steven Williams booked a seat on Eurowings flight EW23
console.log(eurowings);
/* 
{flight: 'EW23', name: 'Sarah Williams'}
{flight: 'EW23', name: 'Steven Williams'}
*/

// WE CAN GO AHEAD AND DO THE SAME FOR ALL OTHER AIRLINES:
const bookLH = book.bind(lufthansa);
bookLH(45, "Abdol Abdol");

const bookLX = book.bind(swiss);
bookLX(60, "Nosrat bolboli");

/* WE CAN ACTUALLY TAKE THIS EVEN FURTHER: */
// book.call(swiss, 583, "George Cooper"); // OUR OLD METHOD
const bookEW23 = book.bind(eurowings, 23); // actually book method needs both flight number and name, but we can here make them separate and write the flight number here and the name in a separate function!
// THE ADVANTAGE IS: WHEN BOTH HAVE THE SAME FLIGHT NUMBER OR USE THE SAME AIRLINE, WE DON'T NEED TO REPEAT THEM EVERY TIME FOR EVERY PERSON, RATHER, WE WRITE THE SIMILARITIES ONE TIME IN THE METHOD(book) AND WRITE JUST THE NAME OF THE PERSONS THAT ARE DIFFERENT IN SEPARATE FUNCTIONS!

// AND ALSO WE CAN CHANGE THE PRESET FLIGHT NUMBER(23) IN ONE PLACE FOR EXAMPLE TO 12345 AND THEN IT WILL CHANGE FOR ALL PASSENGERS ACCORDINGLY!
bookEW23("Jonas Schmedtmann");
bookEW23("Martha Cooper");

console.log("-------------Combining addEventListener with bind()-------------");

const buyNewPlane = document.querySelector(".buy");
console.log(buyNewPlane.textContent);

// With Event Listeneers
lufthansa.planes = 300; // adding planes property to the lufthansa!
// adding buyplane method to lufthansa!
lufthansa.buyplane = function () {
  console.log(this); // <button class="buy">Buy new plane 🛩</button>

  // WHENEVER WE CLICK ON THE Buy new plane BUTTON, one plane will be added here!
  this.planes++;
  console.log(this.planes); // NaN
};

// buyNewPlane.addEventListener("click", lufthansa.buyplane);
// We have to say to this function that, 'this' refers to the lufthansa and not to this: <button class="buy">Buy new plane 🛩</button>. How we can do that: we have to use the bind method as following: lufthansa as argument in bind method is 'this' keyword!
buyNewPlane.addEventListener("click", lufthansa.buyplane.bind(lufthansa));

// AND NOW AFTER CLICKING EACH TIME ON THE BUTTON, WE HAVE:
// 281: {airline: 'Lufthansa', iataCode: 'LH', bookings: Array(4), planes: 300, book: ƒ, …}
// 285: 301 302 303 304, ...

console.log("-----------------Partial application---------");
const addTax = (rate, value) => {
  return value + (value * rate) / 100;
};

console.log(addTax(10, 200));

// JUST AS A REMEMBER FROM THE PAST:
/* 
const bookEW = book.bind(eurowings);
bookEW(23, "Steven Williams");

const bookEW23 = book.bind(eurowings, 23);
bookEW23("Jonas Schmedtmann");
*/

// TO CREATE A FUNCTION FOR A TAX THAT WE USE ALL THE TIME(23% => VAT in PORTUGHAL, we can preset this value always for the products in Portugal as 23%):
// WE DON'T CARE HERE ABOUT THE 'this' KEYWORD AT ALL, BECAUSE IT IS NOT THERE IN THE FUNCTION, THAT'S WHY WE WRITE NULL INSTEAD!
const addVAT = addTax.bind(null, 23); // we give here the rate to the addTax function

// THE ABOVE STATEMENT IS LIKE THE FOLLOWING:
// addVAT = value => value + value * 0.23

console.log(addVAT(100)); // 123 // we give here the value to the addTax function

console.log("REWRITING ABOVE FUNCTION WITH FUNCTION RETURN ANOTHER FUNCTION:");

// BELOW, ONE ARROW FUNCTION RETURNS ANOTHER ARROW FUNCTION:
const addTax_1 = (rate) => {
  // return a new arrow function
  return (value) => {
    return value + (value * rate) / 100;
  };
};

// Our first function here(addTax_1) returns a new function which is stored in addVAT_1 variable and then we can call this variable containing the new function with different parameters!
const addVAT_1 = addTax_1(23);
console.log(addVAT_1(100)); // 123
console.log(addVAT_1(23)); // 28.29

// OR CALL ALL OF THEM IN ONE GO:
console.log(addTax_1(23)(100)); // 123

console.log("------------Immediately Invoked Function Expressions---IIFE-----");

// A function executes once and disappered!
const runOnce = () => {
  console.log("This will never run again!");
};

runOnce();

runOnce(); // THIS IS NOT WHAT WE WANT, WE CAN RUN THIS AS MANY TIMES AS WE WANT!

// THIS IS WHAT WE WANT => IIFE
// FIRST VERSION:
(() => {
  console.log("This will never run again!");
})();

// SECOND VERSION: when we wrap it up in open and close Paranthesis =>(), function will be converted to an expression, it means we converted it from a statement to an expression!
// TO CALL IT IMMEDIATELY, WE CAN ADD OPEN AND CLOSE PARANTHESIS AT THE END => ().
(function () {
  console.log("This will never run again!");
  // ENCAPSULATION AND PRIVACY ARE VERY IMPORTANT WHICH ARE CONSIDERED IN IIFE FUNCTIONS!
  // ALL THE DATA HERE ARE PRIVATE AND ARE ENCAPSULATED INSIDE THE SCOPE OF THE FUNCTION:
  const isPrivate = 23;
  console.log(isPrivate);
})();

const isPrivate = 10;
console.log(isPrivate);

// console.log(isPrivate); // isPrivate is not defined

function hello() {
  console.log("first");
  const isPrivate = 1000;
  var isNotPrivate = 56;
  console.log(isPrivate);
  console.log(isNotPrivate);
}
hello();

// MODERN JS: WE DON'T NEED TOO MUCH IIFE ANYMORE, BECAUSE IN MODERN JS, WE CAN USE JUST TWO {} AND THEN WE HAVE THE PRIVACY FOR OUR DATA LIKE FOLLOWING:
{
  let isPrivateNew = 78; // Displaying the values of let are possible only inside the scope
  var isNotPrivate = 7687; // it ignores the block essentially, therefore, we can display the values of var both inside and outside the scope!
  console.log(isPrivateNew);
}
console.log(isNotPrivate);

console.log("---------------------------CLOSURES----------------------------");

// Closure happen automatically in some situations, but wod don't create it explixcitly and manually!

// A FUNCTION CALLS ANOTHER FUNCTION => WHEN WE CALL secureBooking FUNCTION, IT WILL RETURN A NEW FUNCTION AND THIS FUNCTION WILL BE STORED IN booker FUNCTION! AND THEN THE booker WILL BE A FUNCTION AS WELL!
const secureBooking = function () {
  // we have to create doese situations:
  let passengerCount = 0;

  return function () {
    passengerCount++; // to update this variable which is in mother function
    console.log(`${passengerCount} passengers!`);
  };
};

const booker = secureBooking(); // and now, the booker would be a function as well!

booker(); // 1 passengers!
booker(); // 2 passengers!
booker(); // 3 passengers!

console.dir(booker); // similar to the console.log() but we can get the function here!

// A CLOSURE MAKES A FUNCTION REMEMBER ALL THE VARIABLES THAT EXISTED AT THE FUNCTION BIRTHPLACE WHICH IS secureBooking FUNCTION HERE!

// A FUNCTION HAS ACCESS TO THE VARIABLE ENVIRONMENT(VE) OF THE EXECUTION CONTEXT IN WHICH IT WAS CREATED EVEN AFTER THAT EXECUTION CONTEXT IS GONE!

//It means the booker function which is child of the mother function(secureBooking) has still access to the passengerCount variable(this variable is still alive), although the secureBooking fiúnction is already executed and gone(is dead already!)!

// Closure: VE attached to the function, exactly as it was at the time and place the function was created!

// THANKS TO THE CLOSURE, A FUNCTION DOES NOT LOOSE CONNECTION TO VARIABLES THAT EXISTED AT THE FUNCTION BIRTHPLACE!

// A CLOSURE GIVES A FUNCTION ACCESS TO ALL THE VARIABLES OF ITS PARENT FUNCTION, EVEN AFTER THAT PARENT FUNCTION HAS RETURENDE. THE FUNCTION JK`KEEPS A REFERENCE TO ITS OUTER SCOPE, WHICH PRESERVES THE SCOPE CHAIN THROUOUT TIME!

// A CLOSURE MAKES SURE THAT A FUNCTION DOESN'T LOOSE CONNECTIOM TO VARIABLES THAT EXISTED AT THE FUNCTION'S BIRTH PLACE!

// A CLOSURE IS LIKE A BACKPACK THAT A FUNCTION CARRIES AROUND WHEREEVER IT GOES. THIS BACKPACK HAS ALL THE VARIABLES THAT WERE PRESENT IN THE ENVIRONMENT WHERE THE FUNCTION WAS CREATED!

// WE DO NOT HAVE TO MANUALLY CREATE CLOSURES, THIS IS A JAVASCRIPT FEATURE THAT HAPPENS AUTOMATICALLY. WE CAN'T EVEN ACCESS CLOSED-OVER VARIABLES EXPLICITLY. A CLOSURE IS NOT A TANGIBLE JAVASCRIPT OBJECT!

console.log("------------------MORE CLOSURE EXAMPLES----------------");

let f;

const g = function () {
  const a = 23;
  console.log(a);
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};

g(); // 23
f(); // 46
console.dir(f);
// The Closure has now the value of a.

// In this point of the execution, the variable environment of g() function is no longer there! but f() function closed-over that variable environment and therefore, it is able to access the a variable. We can say, the a variable is inside the backpack of the f function!

// Re-assigning f function
h();
f(); // 1554 => This proves that the second f function also close-over the variable environment of h and therefore, it is able to access the b variable.
console.dir(f);
// The Closure has now the value of b and no longe has the value of a. When we reassign the new value to the f function, then the old closure basically disappears and now, the closure is b.

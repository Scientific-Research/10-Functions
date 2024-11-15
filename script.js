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

console.log("---------------------------call method-----------------");
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

console.log("---------------------------apply method-----------------");
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

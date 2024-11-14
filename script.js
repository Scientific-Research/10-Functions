'use strict';

/* -------------------------DEFAULT PARAMETERS---------------------------- */
console.log('---------------------DEFAULT PARAMETERS-----------------------');
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

createBooking('LH123'); // takes the dafault values
createBooking('LH123', 2, 800); // overwrite the default values
createBooking('LH123', 2); // overwrite the default values
createBooking('LH123', 5); // overwrite the default values

// when we specify 'undefined', it will take our default value => in this case, it will take 1 as default value for number of passengers!
createBooking('LH123', undefined, 1000); // overwrite the default values

console.log(bookings);

/* HOW PASSING ARGUMENTS WORK => Values vs. References */
console.log('----HOW PASSING ARGUMENTS WORK => Values vs. References----');

const flight = 'LH234';
const jonas = {
  name: 'Jonas Schmedtmann',
  passport: 982375198456,
};

const checkIn = (flightNum, passenger) => {
  flightNum = 'LH999';
  passenger.name = 'Mr.' + passenger.name;

  if (passenger.passport === 982375198456) {
    alert('Checked in');
  } else {
    alert('Wrong passport!');
  }
};

checkIn(flight, jonas);

console.log(jonas); // {name: 'Mr.Jonas Schmedtmann', passport: 982375198456}
console.log(flight); // LH234

// Is the same as doing...
const flightNum = flight; // flight is just a primitive type(a string) and flightNum is a COPY of original value and simply not the ORIGINAL value! flightNum is a complete different variable and has nothing to do with the flight variable which is defined outside of the function!

const passenger = jonas; // we changed the passenger name and the jonas object was affected too! why that happened? when we pass a reference type to a function, what is copied, is really just a reference to the object in heap memory, but the both points to the same object in the memory! that's why, when we are manipulating passenger object, is the same exactly as we manipulating the jonas object directly, because both of them points to the same object in the heap memory(both are the same object in the heap memory!)

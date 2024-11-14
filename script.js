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

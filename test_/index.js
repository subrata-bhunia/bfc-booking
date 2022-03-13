const Calendar = require('date-bengali-revised').default;
let cal = new Calendar();
var isoDateString = new Date('2023-06-16');
var _oo = isoDateString - 6 * 60 * 60 * 1000;
// let utc = date.toUTCString();
cal.fromDate(new Date(_oo));
// cal.format('dddd D MMMM, Y [Q]');
//> { year: 1425, month: 1, day: 1}
console.log(isoDateString, '=>', cal.format('dddd D MMMM, Y [Q]'));

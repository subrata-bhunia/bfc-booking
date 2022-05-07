export function getBanglaDateAndMonth(givenDate, format) {
  var banglaMonths = [
    'বৈঃ',
    'জ্যৈঃ',
    'আঃ',
    'শ্রাঃ',
    'ভাঃ',
    'আঃ',
    'কাঃ',
    'অগ্রঃ',
    'পৌঃ',
    'মাঃ',
    'ফাঃ',
    'চৈঃ',
  ];
  var banglaMonthsfull = [
    'বৈশাখ',
    'জ্যৈষ্ঠ',
    'আষাঢ়',
    'শ্রাবণ',
    'ভাদ্র',
    'আশ্বিন',
    'কার্তিক',
    'অগ্রহায়ণ',
    'পৌষ',
    'মাঘ',
    'ফাল্গুন',
    'চৈত্র',
  ];

  var totalMonthDays = [31, 31, 32, 31, 31, 31, 30, 29, 29, 30, 30, 30];
  var prevYearDays = [31, 31, 32, 31, 31, 31, 30, 29, 29, 30, 30, 30];

  //31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30 => 1429

  //31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31 => 1430

  //30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31 => 1431

  //31, 31, 32, 31, 31, 31, 30, 29, 29, 30, 30, 30 => 1432

  //31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30 => 1433

  givenDate = new Date(new Date(givenDate).getTime() + 6 * 60 * 60 * 1000);
  //Year, Date, Month for Gregorian/English Calendar

  var gregDate = givenDate.getDate(),
    gregMonth = givenDate.getMonth(),
    gregYear = givenDate.getFullYear(),
    gregDay = givenDate.getDay();

  // If the given date is smaller than 14th April of current Gregorian Year
  if (gregMonth < 3 || (gregMonth === 3 && gregDate < 14)) {
    // 3 is the index of 'April'
    gregYear = gregYear - 1;
  }

  var epoch = new Date(gregYear + '-04-14');
  var banglaYear = gregYear - 593;

  var MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;

  var utc1 = Date.UTC(epoch.getFullYear(), epoch.getMonth(), epoch.getDate());
  var utc2 = Date.UTC(
    givenDate.getFullYear(),
    givenDate.getMonth(),
    givenDate.getDate(),
  );

  var dayRemaining = Math.floor((utc2 - utc1) / MILLISECONDS_PER_DAY);

  var banglaMonthIndex = 0;

  for (var i = 0; i < banglaMonths.length; i++) {
    if (dayRemaining <= totalMonthDays[i]) {
      banglaMonthIndex = i;
      break;
    }
    dayRemaining -= totalMonthDays[i];
  }
  if (dayRemaining == 0) {
    var banglaDate = prevYearDays[11];
    banglaMonthIndex = 11;
  } else {
    var banglaDate = dayRemaining;
  }

  var banglaNumber = [
    '০',
    '১',
    '২',
    '৩',
    '৪',
    '৫',
    '৬',
    '৭',
    '৮',
    '৯',
    '১০',
    '১১',
    '১২',
    '১৩',
    '১৪',
    '১৫',
    '১৬',
    '১৭',
    '১৮',
    '১৯',
    '২০',
    '২১',
    '২২',
    '২৩',
    '২৪',
    '২৫',
    '২৬',
    '২৭',
    '২৮',
    '২৯',
    '৩০',
    '৩১',
    '৩২',
    '৩৩',
  ];

  if (format == 'MMMM') {
    return `${banglaNumber[banglaDate]} ${banglaMonthsfull[banglaMonthIndex]}`;
  } else {
    return `${banglaNumber[banglaDate]} ${banglaMonths[banglaMonthIndex]}`;
  }
}

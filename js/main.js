var setDays = function () {  // set array of days in month to leap year / not leap year
  var daysInMonth = []
  var currentDate = new Date()

  var currentYear = currentDate.getFullYear()

  var isLeapYear = new Date(currentYear, 1, 29).getDate() === 29  // (from JavaScriptKata) boolean for February 29th, based on the current year

  if (!isLeapYear) {
    daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  } else {
    daysInMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  }

  return daysInMonth
}

var calcDaysPreceding = function (array, numMonth) {  // only called if there has been a previous month (otherwise numMonth would have to respect zero-based array notation)
  var daysInPeriod = 0

  for (var i = 0, l = numMonth; i < l; i += 1) {  // calculate days in preceding months based off of days in month array
    daysInPeriod += array[i]
  }

  return daysInPeriod
}

var getDayOfYear = function () {  // get, stringify, and format day of year
  var daysArray = setDays()  // set the days in the month for year from function call (leap year / not leap year)
  var dayOfYear = 0  // initialize the var that it's all about
  var daysPreceding = 0  // initialize var for adding up days in previous months
  var currentDate = new Date()
  var currentMonth = currentDate.getMonth()
  var currentDay = currentDate.getDate()

  if (currentMonth > 0) {  // zero-based array notation logic for sum of days in preceding months
    daysPreceding = calcDaysPreceding(daysArray, currentMonth)
    dayOfYear = daysPreceding + currentDay
  } else {
    dayOfYear = currentDay
  }

  if (dayOfYear < 100) {  // convert to string for later concatenation
    dayOfYear = '0' + dayOfYear.toString()
  } else {
    dayOfYear = dayOfYear.toString()
  }

  return dayOfYear
}

var getYear = function () {  // get, stringify, and slice year in YY format
  var currentDate = new Date()
  var currentYear = currentDate.getFullYear().toString().slice(-2)

  return currentYear
}

var writeYYDDD = function (containerClass) {  // write the YYDDD to the HTML
  var container = document.querySelector(containerClass)

  container.innerHTML = getYear() + getDayOfYear()
}

setInterval(function () {  // call once per second
  writeYYDDD('.YYDDD-text')
}, 1000)

import { runTests } from "./tests";
import i18n from "./i18n";

/**
 * events points visible on screen (+)(-) ready to scroll and up down
 */
const NUMBER_OF_VISIBLE_POINTS = 10;
const SHIFT_DIRECTION = {
  TO_FUTURE: 1,
  TO_PAST: -1,
};

export const state = [];

/**
 // {
  //   id: 1, // unic number
  //   name: 'Salary',(1)
  //   startDate: '2021-01-03',(1) 
  //   endRepeat: 'Never', // [Never, Date, After] (1)
  //   endDate: '',(if Date)
  //   endTimes: 0, // TODO no less than 1 time (if After)
  //   period: 'Month', // [None, Day, Week, Month, Year, Custom] (1)
  //   customPeriod: 1, // TODO no less than 1 day (if Custom)
  //   amount: 3001,(1)
  //   isOutgoing: false,(1)
  // },
 */

export const MOCKED = [
  // {
  //   id: 1,
  //   name: 'Salary',
  //   startDate: '2021-01-03',
  //   endRepeat: 'Never', // [Never, Date, After]
  //   endDate: '',
  //   endTimes: 0, // TODO no less than 1 time
  //   period: 'Month', // [None, Day, Week, Month, Year, Custom]
  //   customPeriod: 1, // TODO no less than 1 day
  //   amount: 3001,
  //   isOutgoing: false,
  // },
  // {
  //   id: 2,
  //   name: 'Phone pay',
  //   startDate: '2021-11-05',
  //   endRepeat: 'Date', // [Never, Date, After]
  //   endDate: '2028-01-03', // TODO end Data later than start
  //   endTimes: 0,
  //   period: 'Custom', // [None, Day, Week, Month, Year, Custom]
  //   customPeriod: 20,
  //   amount: 100,
  //   isOutgoing: true,
  // },
  // {
  //   id: 3,
  //   name: 'Refueling car',
  //   startDate: '2021-01-04',
  //   endRepeat: 'Date', // [Never, Date, After]
  //   endDate: '2021-03-24',
  //   endTimes: 0,
  //   period: 'Custom', // [None, Day, Week, Month, Year, Custom]
  //   customPeriod: 20,
  //   amount: 500,
  //   isOutgoing: true,
  // },
  // {
  //   id: 4,
  //   name: 'Michael will repay the debt',
  //   startDate: '2022-01-02',
  //   endRepeat: 'Never', // [Never, Date, After]
  //   endDate: '',
  //   endTimes: 1,
  //   period: 'None', // [None, Day, Week, Month, Year, Custom]
  //   customPeriod: 0,
  //   amount: 1500,
  //   isOutgoing: false,
  // },
  // {
  //   id: 5,
  //   name: "I'll pay back the debt to Dad",
  //   startDate: '2022-01-26',
  //   endRepeat: 'After', // [Never, Date, After]
  //   endDate: '',
  //   endTimes: 6,
  //   period: 'Week', // [None, Day, Week, Month, Year, Custom]
  //   customPeriod: 0,
  //   amount: 1750,
  //   isOutgoing: true,
  // },
  // {
  //   id: 6,
  //   name: 'Buying a TV',
  //   startDate: '2022-04-23',
  //   endRepeat: 'Never', // [Never, Date, After]
  //   endDate: '',
  //   endTimes: 2,
  //   period: 'None', // [None, Day, Week, Month, Year, Custom]
  //   customPeriod: 0,
  //   amount: 3400,
  //   isOutgoing: true,
  // },
];

interface IteratorType {
  label: string;
  value: string;
}

const nowYear = new Date().getFullYear();

export const datepickerDate = {
  dd: { min: 1, max: 31 },
  yy: { min: nowYear - 5, max: nowYear + 5 },
};
const DateOptions = { year: "numeric", month: "long", day: "numeric" };
const LangEnum = { en: "en-US", ua: "uk-UA" };

export const dates = {
  convert: function (d: string | number | Date) {
    return new Date(d);
  },
  compare: function (a: any, b: any) {
    const ca = this.convert(a);
    const cb = this.convert(b);

    return ca < cb ? -1 : ca > cb ? 1 : 0;
  },
  format: function (d, lang?) {
    return d.toLocaleDateString(LangEnum[`${lang}`], DateOptions);
  },
};

/**
 * args: (
 *  date1, date2 : <Date>
 * )
 * return: Earlier of date
 */
export const getEarlierDate = (date1, date2) => {
  return dates.compare(date2, date1) < 0 ? date2 : date1;
};

/**
 * args: (
 *  before: <date>,
 *  after: <date>,
 *  custom?: <number of days>
 * )
 * return: number of repeated points between dates
 */
const iterations = {
  Day: (before, after, custom) => {
    const beforeDate = new Date(before);
    const afterDate = new Date(after);
    return Math.trunc((+afterDate - +beforeDate) / (24 * 60 * 60 * 1000));
  },
  Week: (before, after, custom) => {
    const beforeDate = new Date(before);
    const afterDate = new Date(after);
    return Math.trunc((+afterDate - +beforeDate) / (7 * 24 * 60 * 60 * 1000));
  },
  Month: (before, after, custom) => {
    let months;
    months = (after.getFullYear() - before.getFullYear()) * 12;
    months -= before.getMonth();
    months += after.getMonth();
    let days = after.getDate() - before.getDate();
    return months <= 0 ? 0 : days < 0 ? months - 1 : months;
  },
  Year: (before, after, custom) => {
    var difInMs = after - before;
    var absDate = new Date(difInMs); // miliseconds from epoch
    return Math.abs(absDate.getUTCFullYear() - 1970);
  },
  Custom: (before, after, custom) => {
    const beforeDate = new Date(before);
    const afterDate = new Date(after);
    return Math.trunc(
      (+afterDate - +beforeDate) / (custom * 24 * 60 * 60 * 1000)
    );
  },
  None: (before, after, custom) => {
    return 0;
  },
};

/**
 * args: (
 *  measure: ["None" || "Day" || "Week" || "Month" || "Year" || "Custom"]
 *  before: <date>,
 *  after: <date>,
 *  custom?: <number of days>
 * )
 * return: 0 if before later then after || number of repeated points between dates || at least 1
 */
export const getIterations = (measure, before, after, custom) => {
  if (dates.compare(before, after) > 0) {
    console.error("Error getIterations: before > after");
    return 0;
  }
  if (measure === "None") return 1;
  return iterations[measure](
    dates.convert(before),
    dates.convert(after),
    custom
  );
};

/**
 * args: (
 *  startDate <Date>,
 *  repeats: <quantity of repeats>,
 *  direction: <[-1,1] shift direction>
 *  custom: <custom days period: Num>
 * )
 * return: date shifted in direction to number of repeats of peroid
 */
const shift = {
  Day: (startDate, repeats, direction, custom) => {
    const newDate = startDate.setDate(
      startDate.getDate() + direction * repeats
    );
    return dates.convert(newDate);
  },
  Week: (startDate, repeats, direction, custom) => {
    const next = startDate.setDate(
      startDate.getDate() + direction * repeats * 7
    );

    return dates.convert(next);
  },
  Month: (startDate, repeats, direction, custom) => {
    return new Date(
      startDate.setMonth(startDate.getMonth() + direction * repeats)
    );
  },
  Year: (startDate, repeats, direction, custom) => {
    return new Date(
      startDate.setFullYear(startDate.getFullYear() + direction * repeats)
    );
  },
  Custom: (startDate, repeats, direction, custom) => {
    const next = startDate.setDate(
      startDate.getDate() + direction * repeats * (custom || 0)
    );

    return dates.convert(next);
  },
  None: (startDate, repeats, direction, custom) => dates.convert(startDate),
};

export const shiftDate = (gapName, startDate, repeats, direction, custom) => {
  // ["None" || "Day" || "Week" || "Month" || "Year" || "Custom"]
  const res = shift[gapName](
    dates.convert(startDate),
    repeats,
    direction,
    custom
  );
  return res;
};

/**
 * args: (
 *  currentEvent: <one event>,
 *  date: <nesessery Date>
 * )
 * return: quantity of eventsPoints finished before date
 */
export const quantityOfPoints = (currentEvent, date) => {
  if (currentEvent.period === "None") return 1;

  if (currentEvent.endRepeat === "After") {
    if (currentEvent.endTimes === 1) return 1;

    for (let q = 0; q < currentEvent.endTimes; q++) {
      const shiftedDate = shiftDate(
        currentEvent.period,
        currentEvent.startDate,
        q,
        SHIFT_DIRECTION.TO_FUTURE,
        currentEvent.customPeriod
      );
      if (new Date(date) < new Date(shiftedDate)) return q;
    }

    return currentEvent.endTimes;
  }

  if (
    currentEvent.endRepeat === "Date" &&
    dates.compare(currentEvent.startDate, currentEvent.endDate) > 0
  ) {
    console.error("Error quantityOfPoints:");
    console.error("StartDate > endDate");
    return 0;
  }

  if (dates.compare(currentEvent.startDate, date) === 0) return 1;

  if (currentEvent.endRepeat === "Date") {
    const endDate = getEarlierDate(currentEvent.endDate, date);

    const iterations =
      1 +
      getIterations(
        currentEvent.period,
        currentEvent.startDate,
        endDate,
        currentEvent.customPeriod
      );

    return iterations;
  }

  if (currentEvent.endRepeat === "Never") {
    const iterations =
      1 +
      getIterations(
        currentEvent.period,
        currentEvent.startDate,
        date,
        currentEvent.customPeriod
      );

    return iterations;
  }

  if (dates.compare(currentEvent.startDate, currentEvent.endDate) === 0) {
    return 1;
  }

  console.error("Error quantityOfPoints: wrong props");
};

/**
 * args: (
 *  currentEvent: <one event>,
 *  date: <nesessery Date>
 * )
 * return: sum of money (if event multiple or single) events finished before date
 */
export const allSum = (currentEvent, date) => {
  const sign = currentEvent.isOutgoing ? -1 : 1;
  const res = quantityOfPoints(currentEvent, date) * currentEvent.amount * sign;

  return res;
};

/**
 * args: (
 *  eventsData: <All events>,
 *  date: <nesessery Date>
 * )
 * return: array of events started before date
 */
export const findEventsBeforeDate = (eventsData, date) => {
  return eventsData.filter(
    (itemEvent) => dates.compare(date, itemEvent.startDate) > 0
  );
};

/**
 * args: (
 *  eventsData: <All events>,
 *  date: <nesessery Date>
 * )
 * return: sum of money of all events finished before date
 */
export const findBalanseToDate = (eventsArrBefore, date) => {
  let sum = eventsArrBefore.reduce((accumulator, currentEvent) => {
    return accumulator + allSum(currentEvent, date);
  }, 0);

  return sum;
};

/**
 * args: (
 *  eventsData: <All events>,
 *  date: <nesessery Date>
 * )
 *  global const NUMBER_OF_VISIBLE_POINTS: <points on screen>
 *
 * return: array of events points visible on screen (+)(-) ready to scroll and up down
 */
export const getVisiblePointsArray = (eventsData, date, lang) => {
  const eventVisiblePionts = [];
  const eventsArrBefore = findEventsBeforeDate(eventsData, date);

  for (const event of eventsArrBefore) {
    const pointsQuantity = quantityOfPoints(event, date);
    for (let i = -1; i < pointsQuantity - 1; i++) {
      const nextPointDate = dates.convert(
        shiftDate(
          event.period,
          event.startDate,
          i + 1,
          SHIFT_DIRECTION.TO_FUTURE,
          event.customPeriod
        )
      );
      const visiblePoint = {
        date: nextPointDate,
        balance: 0,
        source: event,
        amount: event.amount,
      };
      eventVisiblePionts.push(visiblePoint);
    }
  }

  const sortedEventVisiblePionts = eventVisiblePionts.sort((a, b) =>
    dates.compare(dates.convert(a.date), dates.convert(b.date))
  );

  let currentBalance = 0;
  sortedEventVisiblePionts.forEach((a) => {
    currentBalance =
      currentBalance + (a.source.isOutgoing ? -1 : 1) * a.source.amount;
    a.balance = currentBalance;
  });

  return sortedEventVisiblePionts;
};

/**
 * args: (
 *  eventsData: <All events>,
 *  date: <nesessery Date>
 * )
 * return: array of events started before date
 */

export const selectDropdownPeriod = [
  "Year",
  "Month",
  "Week",
  "Day",
  "Custom",
  "None",
];

export const selectDropdownEndRepeat = ["Never", "Date", "After"];

export const optionsDateViewFormat = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
  timeZone: "UTC",
  timeZoneName: "short",
};

export const capitalize = (str: String) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const months = {
  en: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  ua: [
    "Січень",
    "Лютий",
    "Березень",
    "Квітень",
    "Травень",
    "Червень",
    "Липень",
    "Серпень",
    "Вересень",
    "Жовтень",
    "Листопад",
    "Грудень",
  ],
};

// runTests();

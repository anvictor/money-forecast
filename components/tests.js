import {
  getEarlierDate,
  dates,
  getIterations,
  shiftDate,
  quantityOfPoints,
  currentEvent,
  allSum,
} from './utils';

const write = (name, expectation, res, isDate) => {
  let mark;
  if (isDate === 'date') {  
    mark = `${dates.compare(res, expectation) === 0 ? 'completed' : 'fallen'}`;
  } else {
    mark = `${res === expectation ? 'completed' : 'fallen'}`;
  } 
  if (mark === 'completed')
    console.warn('test', name, expectation, '=', res, mark);
  if (mark === 'fallen')
    console.error('test', name, expectation, '=', res, mark);
};

export const runTests = () => {
  let expectation, res, mark, name;

  name = 'getEarlierDate';
  res = getEarlierDate('2009-02-28', '2009-01-29');
  expectation = '2009-01-29';
  write(name, expectation, res, 'noDate');

  name = 'getIterations';
  console.log(name, 'message: Error getIterations: before > after');
  res = getIterations('DaysBetween', '2009-02-28', '2009-01-27');
  expectation = 0;
  write(name, expectation, res, 'noDate');

  name = 'getIterations  SameDate';
  res = getIterations('Day', '2009-01-10', '2009-01-10');
  expectation = 0;
  write(name, expectation, res, 'noDate');

  name = 'getIterations  Day';
  res = getIterations('Day', '2009-01-10', '2009-01-27');
  expectation = 17;
  write(name, expectation, res, 'noDate');

  name = 'getIterations Week';
  res = getIterations('Week', '2009-01-01', '2009-01-15');
  expectation = 2;
  write(name, expectation, res, 'noDate');

  name = 'getIterations Month';
  res = getIterations('Month', '2009-01-28', '2009-03-27');
  expectation = 1;
  write(name, expectation, res, 'noDate');

  name = 'getIterations Month';
  res = getIterations('Year', '2010-02-28', '2014-02-27');
  expectation = 3;
  write(name, expectation, res, 'noDate');

  name = 'getIterations Custom';
  res = getIterations('Custom', '2010-01-01', '2010-01-27', 3);
  expectation = 8;
  write(name, expectation, res, 'noDate');

  name = 'getIterations None';
  res = getIterations('None', '2010-01-01', '2020-03-27');
  expectation = 1;
  write(name, expectation, res, 'noDate');

  name = 'getIterations Day';
  res = getIterations('Day', '2020-12-31T00:00:00.000Z', '2021-01-17');
  expectation = 17;
  write(name, expectation, res, 'noDate');

  name = 'dates.compare first > second';
  res = dates.compare('2010-01-27T00:00:00.000Z', '2010-01-26T00:00:00.000Z');
  expectation = 1;
  write(name, expectation, res, 'noDate');

  name = 'dates.compare first < second';
  res = dates.compare('2010-01-27T00:00:00.000Z', '2010-01-28T00:00:00.000Z');
  expectation = -1;
  write(name, expectation, res, 'noDate');

  name = 'dates.compare first === second';
  res = dates.compare('2010-01-27T00:00:00.000Z', '2010-01-27T00:00:00.000Z');
  expectation = 0;
  write(name, expectation, res, 'noDate');

  // shiftDate(gapName, startDate, repeats, direction=[-1,1], custom);

  name = 'shiftDate None';
  res = shiftDate('None', '2010-01-27', 10, 1, 2);
  expectation = '2010-01-27T00:00:00.000Z';
  write(name, expectation, res, 'date');

  name = 'shiftDate Day';
  res = shiftDate('Day', '2010-01-17T22:00:00.000Z', 10, -1, null);
  expectation = '2010-01-07T22:00:00.000Z';
  write(name, expectation, res, 'date');

  name = 'shiftDate Week';
  res = shiftDate('Week', '2010-02-15T22:00:00.000Z', 2, 1, 2);
  expectation = '2010-03-01T22:00:00.000Z';
  write(name, expectation, res, 'date');

  name = 'shiftDate Month';
  res = shiftDate('Month', '2010-04-14', 3, -1, 2);
  expectation = '2010-01-14T01:00:00.000Z';
  write(name, expectation, res, 'date');

  name = 'shiftDate Year';
  res = shiftDate('Year', '2012-01-26T22:00:00.000Z', 1, 1, 2);
  expectation = '2013-01-26T22:00:00.000Z';
  write(name, expectation, res, 'date');

  name = 'shiftDate Custom';
  res = shiftDate('Custom', '2012-01-16T22:00:00.000Z', 1, 1, 10);
  expectation = '2012-01-26T22:00:00.000Z';
  write(name, expectation, res, 'date');

  name = 'shiftDate 0:';
  res = shiftDate('Month', '2021-12-29', 0, 1, 1);
  expectation = '2021-12-29T00:00:00.000Z';
  write(name, expectation, res, 'date');

  name = 'shiftDate -1 :';
  res = shiftDate('Day', '2021-12-29', 1, -1, 1);
  expectation = '2021-12-28T00:00:00.000Z';
  write(name, expectation, res, 'date');

  //  quantity Of Points

  name = 'quantityOfPoints endRepeat After 1 :';
  res = quantityOfPoints(
    {
      name: 'Test',
      startDate: '2021-09-25',
      endRepeat: 'After', // [Never, Date, After]
      endDate: '', // TODO end Data later than start
      endTimes: 1,
      period: 'Month', // [None, Day, Week, Month, Year, Custom]
      customPeriod: 13, // TODO no less than 1 day
      amount: 1000,
      isOutgoing: false,
    },
    '2021-12-25'
  );
  expectation = 1;
  write(name, expectation, res, 'noDate');

  name = 'quantityOfPoints endRepeat After 13 :';
  res = quantityOfPoints(
    {
      name: 'Test',
      startDate: '2021-09-25',
      endRepeat: 'After', // [Never, Date, After]
      endDate: '', // TODO end Data later than start
      endTimes: 13,
      period: 'Month', // [None, Day, Week, Month, Year, Custom]
      customPeriod: 1, // TODO no less than 1 day
      amount: 1000,
      isOutgoing: false,
    },
    '2121-12-25'
  );
  expectation = 13;
  write(name, expectation, res, 'noDate');

  name = 'quantityOfPoints endRepeat  period None :';
  res = quantityOfPoints(
    {
      name: 'Test',
      startDate: '2021-09-25',
      endRepeat: 'After', // [Never, Date, After]
      endDate: '', // TODO end Data later than start
      endTimes: 13,
      period: 'None', // [None, Day, Week, Month, Year, Custom]
      customPeriod: 1, // TODO no less than 1 day
      amount: 1000,
      isOutgoing: false,
    },
    '2021-12-25'
  );
  expectation = 1;
  write(name, expectation, res, 'noDate');

  name = 'quantityOfPoints startDate === endDate';
  res = quantityOfPoints(
    {
      name: 'Test',
      startDate: '2021-09-25',
      endRepeat: 'Date', // [Never, Date, After]
      endDate: '2021-09-25', // TODO end Data later than start
      endTimes: 1,
      period: 'Day', // [None, Day, Week, Month, Year, Custom]
      customPeriod: 1, // TODO no less than 1 day
      amount: 1000,
      isOutgoing: false,
    },
    '2021-12-25'
  );
  expectation = 1;
  write(name, expectation, res, 'noDate');

  name = 'quantityOfPoints startDate > endDate';
  console.log('');
  console.log(name, 'message: "Error quantityOfPoints: startDate > endDate"');
  res = quantityOfPoints(
    {
      name: 'Test',
      startDate: '2021-09-25',
      endRepeat: 'Date', // [Never, Date, After]
      endDate: '2021-09-24', // TODO end Data later than start
      endTimes: 1,
      period: 'Day', // [None, Day, Week, Month, Year, Custom]
      customPeriod: 1, // TODO no less than 1 day
      amount: 1000,
      isOutgoing: false,
    },
    '2021-12-25'
  );
  expectation = 0;
  write(name, expectation, res, 'noDate');

  name = 'quantityOfPoints startDate === currentDate';
  res = quantityOfPoints(
    {
      name: 'Test',
      startDate: '2021-09-25',
      endRepeat: 'Date', // [Never, Date, After]
      endDate: '2021-09-26', // TODO end Data later than start
      endTimes: 1,
      period: 'Day', // [None, Day, Week, Month, Year, Custom]
      customPeriod: 1, // TODO no less than 1 day
      amount: 1000,
      isOutgoing: false,
    },
    '2021-09-25'
  );
  expectation = 1;
  write(name, expectation, res, 'noDate');

  name = 'quantityOfPoints Day endDate < currentDate';
  res = quantityOfPoints(
    {
      name: 'Test',
      startDate: '2021-01-01',
      endRepeat: 'Date', // [Never, Date, After]
      endDate: '2021-01-15', // TODO end Data later than start
      endTimes: 1,
      period: 'Day', // [None, Day, Week, Month, Year, Custom]
      customPeriod: 1, // TODO no less than 1 day
      amount: 1000,
      isOutgoing: false,
    },
    '2021-01-27'
  );
  expectation = 15;
  write(name, expectation, res, 'noDate');

  name = 'quantityOfPoints Day endDate > currentDate';
  res = quantityOfPoints(
    {
      name: 'Test',
      startDate: '2021-01-01',
      endRepeat: 'Date', // [Never, Date, After]
      endDate: '2126-01-19', // TODO end Data later than start
      endTimes: 1,
      period: 'Day', // [None, Day, Week, Month, Year, Custom]
      customPeriod: 1, // TODO no less than 1 day
      amount: 1000,
      isOutgoing: false,
    },
    '2021-01-17'
  );
  expectation = 17;
  write(name, expectation, res, 'noDate');

  name = 'quantityOfPoints Day endRepeat Never';
  res = quantityOfPoints(
    {
      name: 'Test',
      startDate: '2021-01-01',
      endRepeat: 'Never', // [Never, Date, After]
      endDate: '2051-01-19', // TODO end Data later than start
      endTimes: 1,
      period: 'Day', // [None, Day, Week, Month, Year, Custom]
      customPeriod: 1, // TODO no less than 1 day
      amount: 1000,
      isOutgoing: false,
    },
    '2021-01-26'
  );
  expectation = 26;
  write(name, expectation, res, 'noDate');

  name = 'quantityOfPoints Day endRepeat Never';
  res = quantityOfPoints(
    {
      name: 'Salary',
      startDate: '2021-01-25',
      endRepeat: 'Never', // [Never, Date, After]
      endDate: '',
      endTimes: 0, // TODO no less than 1 time
      period: 'Month', // [None, Day, Week, Month, Year, Custom]
      customPeriod: 1, // TODO no less than 1 day
      amount: 3001,
      isOutgoing: false,
    },
    '2022-01-24'
  );
  expectation = 12;
  write(name, expectation, res, 'noDate');

  name = 'quantityOfPoints Day, endRepeat After, endTimes before date';
  res = quantityOfPoints(
    {
      name: 'Test',
      startDate: '2021-01-01T00:00:00.000Z',
      endRepeat: 'After', // [Never, Date, After]
      endDate: '2021-01-19T00:00:00.000Z', // TODO end Data later than start
      endTimes: 12,
      period: 'Day', // [None, Day, Week, Month, Year, Custom]
      customPeriod: 1, // TODO no less than 1 day
      amount: 1000,
      isOutgoing: false,
    },
    '2021-01-12T00:00:00.000Z'
  );
  expectation = 12;
  write(name, expectation, res, 'noDate');

  name = 'quantityOfPoints Day endRepeat After date before endTimes';
  res = quantityOfPoints(
    {
      name: 'Test',
      startDate: '2021-01-01',
      endRepeat: 'After', // [Never, Date, After]
      endDate: '2021-01-19', // TODO end Data later than start
      endTimes: 12,
      period: 'Day', // [None, Day, Week, Month, Year, Custom]
      customPeriod: 1, // TODO no less than 1 day
      amount: 1000,
      isOutgoing: false,
    },
    '2021-01-11'
  );
  expectation = 11;
  write(name, expectation, res, 'noDate');

  //  ********** Week ***************

  name = 'quantityOfPoints Week endDate < currentDate';
  res = quantityOfPoints(
    {
      name: 'Test',
      startDate: '2021-01-01',
      endRepeat: 'Date', // [Never, Date, After]
      endDate: '2021-01-14', // TODO end Data later than start
      endTimes: 1,
      period: 'Week', // [None, Day, Week, Month, Year, Custom]
      customPeriod: 1, // TODO no less than 1 day
      amount: 1000,
      isOutgoing: false,
    },
    '2021-03-17'
  );
  expectation = 2;
  write(name, expectation, res, 'noDate');

  name = 'quantityOfPoints Week endRepeat Never';
  res = quantityOfPoints(
    {
      name: 'Test',
      startDate: '2021-01-01',
      endRepeat: 'Never', // [Never, Date, After]
      endDate: '2021-01-19', // TODO end Data later than start
      endTimes: 1,
      period: 'Week', // [None, Day, Week, Month, Year, Custom]
      customPeriod: 1, // TODO no less than 1 day
      amount: 1000,
      isOutgoing: false,
    },
    '2021-01-09'
  );
  expectation = 2;
  write(name, expectation, res, 'noDate');

  name = 'quantityOfPoints Week endRepeat After endTimes before date';
  res = quantityOfPoints(
    {
      name: 'Test',
      startDate: '2021-01-01',
      endRepeat: 'After', // [Never, Date, After]
      endDate: '2021-01-19', // TODO end Data later than start
      endTimes: 12,
      period: 'Week', // [None, Day, Week, Month, Year, Custom]
      customPeriod: 1, // TODO no less than 1 day
      amount: 1000,
      isOutgoing: false,
    },
    '2024-01-08'
  );
  expectation = 12;
  write(name, expectation, res, 'noDate');

  name = 'quantityOfPoints Week endRepeat After date before endTimes';
  res = quantityOfPoints(
    {
      name: 'Test',
      startDate: '2021-01-01',
      endRepeat: 'After', // [Never, Date, After]
      endDate: '2021-01-19', // TODO end Data later than start
      endTimes: 12,
      period: 'Week', // [None, Day, Week, Month, Year, Custom]
      customPeriod: 1, // TODO no less than 1 day
      amount: 1000,
      isOutgoing: false,
    },
    '2021-01-12'
  );
  expectation = 2;
  write(name, expectation, res, 'noDate');

  // ********** Month ***************

  name = 'quantityOfPoints Month endDate < currentDate';
  res = quantityOfPoints(
    {
      name: 'Test',
      startDate: '2021-01-02',
      endRepeat: 'Date', // [Never, Date, After]
      endDate: '2021-03-02', // TODO end Data later than start
      endTimes: 1,
      period: 'Month', // [None, Day, Week, Month, Year, Custom]
      customPeriod: 1, // TODO no less than 1 day
      amount: 1000,
      isOutgoing: false,
    },
    '2021-03-17'
  );
  expectation = 3;
  write(name, expectation, res, 'noDate');

  name = 'quantityOfPoints Month endDate > currentDate';
  res = quantityOfPoints(
    {
      name: 'Test',
      startDate: '2021-01-01',
      endRepeat: 'Date', // [Never, Date, After]
      endDate: '2021-09-19', // TODO end Data later than start
      endTimes: 1,
      period: 'Month', // [None, Day, Week, Month, Year, Custom]
      customPeriod: 1, // TODO no less than 1 day
      amount: 1000,
      isOutgoing: false,
    },
    '2021-04-01'
  );
  expectation = 4;
  write(name, expectation, res, 'noDate');

  name = 'quantityOfPoints Month endRepeat Never';
  res = quantityOfPoints(
    {
      name: 'Test',
      startDate: '2021-01-01',
      endRepeat: 'Never', // [Never, Date, After]
      endDate: '2021-01-19', // TODO end Data later than start
      endTimes: 1,
      period: 'Month', // [None, Day, Week, Month, Year, Custom]
      customPeriod: 1, // TODO no less than 1 day
      amount: 1000,
      isOutgoing: false,
    },
    '2021-03-01'
  );
  expectation = 3;
  write(name, expectation, res, 'noDate');

  name = 'quantityOfPoints Month endRepeat After endTimes before date';
  res = quantityOfPoints(
    {
      name: 'Test',
      startDate: '2021-01-01',
      endRepeat: 'After', // [Never, Date, After]
      endDate: '2021-01-19', // TODO end Data later than start
      endTimes: 12,
      period: 'Month', // [None, Day, Week, Month, Year, Custom]
      customPeriod: 1, // TODO no less than 1 day
      amount: 1000,
      isOutgoing: false,
    },
    '2026-01-13'
  );
  expectation = 12;
  write(name, expectation, res, 'noDate');

  name = 'quantityOfPoints Month endRepeat After date before endTimes';
  res = quantityOfPoints(
    {
      name: 'Test',
      startDate: '2021-01-01',
      endRepeat: 'After', // [Never, Date, After]
      endDate: '2021-01-19', // TODO end Data later than start
      endTimes: 12,
      period: 'Month', // [None, Day, Week, Month, Year, Custom]
      customPeriod: 1, // TODO no less than 1 day
      amount: 1000,
      isOutgoing: false,
    },
    '2021-09-01'
  );
  expectation = 9;
  write(name, expectation, res, 'noDate');

  // ********** Year ***************

  name = 'quantityOfPoints Year endDate < currentDate';
  res = quantityOfPoints(
    {
      name: 'Test',
      startDate: '2021-01-01',
      endRepeat: 'Date', // [Never, Date, After]
      endDate: '2026-01-01', // TODO end Data later than start
      endTimes: 1,
      period: 'Year', // [None, Day, Week, Month, Year, Custom]
      customPeriod: 1, // TODO no less than 1 day
      amount: 1000,
      isOutgoing: false,
    },
    '2041-03-17'
  );
  expectation = 6;
  write(name, expectation, res, 'noDate');

  name = 'quantityOfPoints Year endDate > currentDate';
  res = quantityOfPoints(
    {
      name: 'Test',
      startDate: '2021-01-02',
      endRepeat: 'Date', // [Never, Date, After]
      endDate: '2041-09-19', // TODO end Data later than start
      endTimes: 1,
      period: 'Year', // [None, Day, Week, Month, Year, Custom]
      customPeriod: 1, // TODO no less than 1 day
      amount: 1000,
      isOutgoing: false,
    },
    '2030-01-02'
  );
  expectation = 10;
  write(name, expectation, res, 'noDate');

  name = 'quantityOfPoints Year endRepeat Never';
  res = quantityOfPoints(
    {
      name: 'Test',
      startDate: '2020-01-02',
      endRepeat: 'Never', // [Never, Date, After]
      endDate: '2021-01-19', // TODO end Data later than start
      endTimes: 1,
      period: 'Year', // [None, Day, Week, Month, Year, Custom]
      customPeriod: 1, // TODO no less than 1 day
      amount: 1000,
      isOutgoing: false,
    },
    '2031-01-02'
  );
  expectation = 12;
  write(name, expectation, res, 'noDate');

  name = 'quantityOfPoints Year endRepeat After endTimes before date';
  res = quantityOfPoints(
    {
      name: 'Test',
      startDate: '2021-01-01',
      endRepeat: 'After', // [Never, Date, After]
      endDate: '2021-01-19', // TODO end Data later than start
      endTimes: 12,
      period: 'Year', // [None, Day, Week, Month, Year, Custom]
      customPeriod: 1, // TODO no less than 1 day
      amount: 1000,
      isOutgoing: false,
    },
    '2066-01-13'
  );
  expectation = 12;
  write(name, expectation, res, 'noDate');

  name = 'quantityOfPoints Year endRepeat After date before endTimes';
  res = quantityOfPoints(
    {
      name: 'Test',
      startDate: '2021-01-01',
      endRepeat: 'After', // [Never, Date, After]
      endDate: '2021-01-19', // TODO end Data later than start
      endTimes: 12,
      period: 'Year', // [None, Day, Week, Month, Year, Custom]
      customPeriod: 1, // TODO no less than 1 day
      amount: 1000,
      isOutgoing: false,
    },
    '2029-01-01'
  );
  expectation = 9;
  write(name, expectation, res, 'noDate');

  // ********** Custom ***************

  name = 'quantityOfPoints Custom endDate < currentDate';
  res = quantityOfPoints(
    {
      name: 'Test',
      startDate: '2021-01-01',
      endRepeat: 'Date', // [Never, Date, After]
      endDate: '2021-01-06', // TODO end Data later than start
      endTimes: 1,
      period: 'Custom', // [None, Day, Week, Month, Year, Custom]
      customPeriod: 5, // TODO no less than 1 day
      amount: 1000,
      isOutgoing: false,
    },
    '2051-03-17'
  );
  expectation = 2;
  write(name, expectation, res, 'noDate');

  name = 'quantityOfPoints Custom endDate > currentDate';
  res = quantityOfPoints(
    {
      name: 'Test',
      startDate: '2021-01-01',
      endRepeat: 'Date', // [Never, Date, After]
      endDate: '2081-09-19', // TODO end Data later than start
      endTimes: 1,
      period: 'Custom', // [None, Day, Week, Month, Year, Custom]
      customPeriod: 10, // TODO no less than 1 day
      amount: 1000,
      isOutgoing: false,
    },
    '2021-01-31'
  );
  expectation = 4;
  write(name, expectation, res, 'noDate');

  name = 'quantityOfPoints Custom endRepeat Never';
  res = quantityOfPoints(
    {
      name: 'Test',
      startDate: '2020-01-02',
      endRepeat: 'Never', // [Never, Date, After]
      endDate: '2021-01-19', // TODO end Data later than start
      endTimes: 1,
      period: 'Custom', // [None, Day, Week, Month, Year, Custom]
      customPeriod: 10, // TODO no less than 1 day
      amount: 1000,
      isOutgoing: false,
    },
    '2020-01-22'
  );
  expectation = 3;
  write(name, expectation, res, 'noDate');

  name = 'quantityOfPoints Custom endRepeat After endTimes before date';
  res = quantityOfPoints(
    {
      name: 'Test',
      startDate: '2021-01-01',
      endRepeat: 'After', // [Never, Date, After]
      endDate: '2021-01-19', // TODO end Data later than start
      endTimes: 3000,
      period: 'Custom', // [None, Day, Week, Month, Year, Custom]
      customPeriod: 5, // TODO no less than 1 day
      amount: 1000,
      isOutgoing: false,
    },
    '2021-01-21'
  );
  expectation = 5;
  write(name, expectation, res, 'noDate');

  name = 'quantityOfPoints Custom endRepeat After date before endTimes';
  res = quantityOfPoints(
    {
      name: 'Test',
      startDate: '2021-01-01',
      endRepeat: 'After', // [Never, Date, After]
      endDate: '2021-01-19', // TODO end Data later than start
      endTimes: 19,
      period: 'Custom', // [None, Day, Week, Month, Year, Custom]
      customPeriod: 5, // TODO no less than 1 day
      amount: 1000,
      isOutgoing: false,
    },
    '2021-01-26'
  );
  expectation = 6;
  write(name, expectation, res, 'noDate');

  name = 'allSum';
  res = allSum(
    {
      name: 'Test',
      startDate: '2021-01-01',
      endRepeat: 'After', // [Never, Date, After]
      endDate: '2021-01-10', // TODO end Data later than start
      endTimes: 19,
      period: 'Custom', // [None, Day, Week, Month, Year, Custom]
      customPeriod: 5, // TODO no less than 1 day
      amount: 300,
      isOutgoing: false,
    },
    '2021-01-25'
  );
  expectation = 1500;
  write(name, expectation, res, 'noDate');

  console.log('All tests are completed');
};

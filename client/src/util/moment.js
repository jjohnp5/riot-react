import moment from 'moment';
import toNumber from 'lodash/toNumber';


export const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export const convertEmptyStringsToZero = (hours) => {
  if (hours === '') return 0;
  return hours;
};

export const calculateTotalHours = (timesheet) => {
  const add = (num1, num2) => num1 + num2;
  return weekdays
    .map(weekday => timesheet.days[weekday.toLowerCase()])
    .map(day => day.hours)
    .map(convertEmptyStringsToZero)
    .map(hours => parseFloat(hours, 0))
    .reduce(add)
    .toString();
};

export const notWeekend = day => day.key !== 'Saturday' && day.key !== 'Sunday';

export const calculateHours = (startRaw, lunchRaw, finishRaw) => {
  const start = moment(startRaw, 'HH:mm');
  const lunch = toNumber(lunchRaw);
  const finish = moment(finishRaw, 'HH:mm');

  const startToFinish = moment
    .duration(finish.diff(start))
    .asHours();
  
  const lunchInHours = lunch / 60;
  const newHours = startToFinish - lunchInHours;
  return newHours.toString();
};
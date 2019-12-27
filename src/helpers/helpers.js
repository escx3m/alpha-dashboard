import dayjs from 'dayjs';
import ru from 'dayjs/locale/ru';
import 'dayjs/locale/ru';
import moment from 'moment';
import { DateTime } from 'luxon';

dayjs.locale({
  ...ru,
  weekStart: 1
});
moment.locale('ru');
DateTime.local().setLocale('ru');

export function stringToTestId(string) {
  return string.replace(/[&\/\\#,+()$~%.'":*?<>{}\s]/g, '');
}
export function makeJSDateObject(date) {
  if (date instanceof dayjs) {
    return date.clone().toDate();
  }
  if (moment.isMoment(date)) {
    return date.clone().toDate();
  }
  if (date instanceof DateTime) {
    return date.toJSDate();
  }
  if (date instanceof Date) {
    return new Date(date.getTime());
  }
  throw new Error('Cannot properly parse argument passed to cloneCrossUtils');
}
export function copy(text) {
  return navigator.clipboard.writeText(text);
}
export function loadScript(src, position) {
  const script = document.createElement('script');
  script.setAttribute('async', '');
  script.src = src;
  position.appendChild(script);
  return script;
}
export function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function findIndexOfObject(array, attr, value) {
  for (var i = 0; i < array.length; i += 1) {
    if (array[i][attr] === value) {
      return i;
    }
  }
  return -1;
}

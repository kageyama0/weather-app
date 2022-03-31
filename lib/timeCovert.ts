import moment from 'moment-timezone';
import 'moment/locale/ja';

export const timeCovert = (dateTime: number, timezone: string) => {
  // ex.) 2022/3/29/22/57/57
  const ISO_dateTime = moment(dateTime, 'X').tz(timezone).format('Y/M/D/ddd/HH/mm');

  const splited_ISO_dateTime = ISO_dateTime.split('/');

  const dateTime_dict = {
    year: splited_ISO_dateTime[0],
    month: splited_ISO_dateTime[1],
    day: splited_ISO_dateTime[2],
    weekday: splited_ISO_dateTime[3],
    hour: splited_ISO_dateTime[4],
    minute: splited_ISO_dateTime[5]
  };

  return dateTime_dict;
};

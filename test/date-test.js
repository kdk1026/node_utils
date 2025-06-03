const date = require('./date/date-util');

console.log( 'Today.getTodayString : ',  date.Today.getTodayString() );
console.log( 'Today.getTodayStringFormat : ', date.Today.getTodayStringFormat('YYYY-MM-DD') );
console.log( 'Today.getCurrentTime : ', date.Today.getCurrentTime() );
console.log( 'Today.getYear : ', date.Today.getYear() );
console.log( 'Today.getMonthValue : ', date.Today.getMonthValue() );
console.log( 'Today.getDayOfMonth : ', date.Today.getDayOfMonth() );
console.log( 'Today.getHour : ', date.Today.getHour() );

console.log('');
console.log('');
console.log( 'StringFormat.getStringDate : ', date.StringFormat.getStringDate('20210512', 'YYYY-MM-DD') );
console.log( 'StringFormat.getStringDateTime : ', date.StringFormat.getStringDateTime('20210512113333', 'YYYY-MM-DD HH:mm:ss') );

console.log('');
console.log('');
console.log( 'Convert.getStringToDate : ', date.Convert.getStringToDate('20210512') );
console.log( 'Convert.getStringToDate : ', date.Convert.getStringToDate('20210512113333') );
console.log( 'Convert.getDateToString : ', date.Convert.getDateToString(new Date())  );
console.log( 'Convert.getDateToStringFormat : ', date.Convert.getDateToStringFormat(new Date(), 'YYYY-MM-DD HH:mm:ss') );

console.log('');
console.log('');
console.log( 'CalcDate.plusMinusDay : ', date.CalcDate.plusMinusDay(1) );
console.log( 'CalcDate.plusMinusDay : ', date.CalcDate.plusMinusDay(-1) );
console.log( 'CalcDate.plusMinusDayString : ', date.CalcDate.plusMinusDayString('20210512', 3) );
console.log( 'CalcDate.plusMinusMonth : ', date.CalcDate.plusMinusMonth(-1)  );
console.log( 'CalcDate.plusMinusMonthString : ', date.CalcDate.plusMinusMonthString('20210413', 2) );
console.log( 'CalcDate.plusMinusYear : ', date.CalcDate.plusMinusYear(-1) );
console.log( 'CalcDate.plusMinusYearString : ', date.CalcDate.plusMinusYearString('20200513', 1) );

console.log('');
console.log('');
console.log( 'CalcTime.plusMinusHour : ', date.CalcTime.plusMinusHour(-1) );
console.log( 'CalcTime.plusMinusHourString : ', date.CalcTime.plusMinusHourString('20210513000000', -1) );
console.log( 'CalcTime.plusMinusMinute : ', date.CalcTime.plusMinusMinute(-10) );
console.log( 'CalcTime.plusMinusMinuteString : ', date.CalcTime.plusMinusMinuteString('20210513120000', -10) );
console.log( 'CalcTime.plusMinusSecond : ', date.CalcTime.plusMinusSecond(-30) );

console.log('');
console.log('');
console.log( 'GetDateInterval.intervalYears : ', date.GetDateInterval.intervalYears(date.CalcDate.plusMinusYear(1)) );
console.log( 'GetDateInterval.intervalYears : ', date.GetDateInterval.intervalYears(date.CalcDate.plusMinusYear(0)) );
console.log( 'GetDateInterval.intervalYears : ', date.GetDateInterval.intervalYears(date.CalcDate.plusMinusYear(-1)) );

console.log('');
console.log( 'GetDateInterval.intervalMonths : ', date.GetDateInterval.intervalMonths(date.CalcDate.plusMinusMonth(1)) );
console.log( 'GetDateInterval.intervalMonths : ', date.GetDateInterval.intervalMonths(date.CalcDate.plusMinusMonth(0)) );
console.log( 'GetDateInterval.intervalMonths : ', date.GetDateInterval.intervalMonths(date.CalcDate.plusMinusMonth(-1)) );

console.log('');
console.log( 'GetDateInterval.intervalDays : ', date.GetDateInterval.intervalDays(date.CalcDate.plusMinusDay(1)) );
console.log( 'GetDateInterval.intervalDays : ', date.GetDateInterval.intervalDays(date.CalcDate.plusMinusDay(0)) );
console.log( 'GetDateInterval.intervalDays : ', date.GetDateInterval.intervalDays(date.CalcDate.plusMinusDay(-1)) );

console.log('');
console.log('');
console.log( 'GetTimeInterval.intervalHours : ', date.GetTimeInterval.intervalHours(date.CalcTime.plusMinusHour(1)) );
console.log( 'GetTimeInterval.intervalHours : ', date.GetTimeInterval.intervalHours(date.CalcTime.plusMinusHour(0)) );
console.log( 'GetTimeInterval.intervalHours : ', date.GetTimeInterval.intervalHours(date.CalcTime.plusMinusHour(-1)) );

console.log('');
console.log( 'GetTimeInterval.intervalMinutes : ', date.GetTimeInterval.intervalMinutes(date.CalcTime.plusMinusMinute(1)) );
console.log( 'GetTimeInterval.intervalMinutes : ', date.GetTimeInterval.intervalMinutes(date.CalcTime.plusMinusMinute(0)) );
console.log( 'GetTimeInterval.intervalMinutes : ', date.GetTimeInterval.intervalMinutes(date.CalcTime.plusMinusMinute(-1)) );

console.log('');
console.log( 'GetTimeInterval.intervalSeconds : ', date.GetTimeInterval.intervalSeconds(date.CalcTime.plusMinusSecond(1)) );
console.log( 'GetTimeInterval.intervalSeconds : ', date.GetTimeInterval.intervalSeconds(date.CalcTime.plusMinusSecond(0)) );
console.log( 'GetTimeInterval.intervalSeconds : ', date.GetTimeInterval.intervalSeconds(date.CalcTime.plusMinusSecond(-1)) );

console.log('');
console.log('');
console.log( 'GetDayOfWeek.getDayOfWeek : ', date.GetDayOfWeek.getDayOfWeek() );
console.log( 'GetDayOfWeek.getDayOfWeekString : ', date.GetDayOfWeek.getDayOfWeekString('20210514') );
console.log( 'GetDayOfWeek.getFirstDayOfWeek : ', date.GetDayOfWeek.getFirstDayOfWeek() );
console.log( 'GetDayOfWeek.getFirstDayOfWeekString : ', date.GetDayOfWeek.getFirstDayOfWeekString('20210430') );
console.log( 'GetDayOfWeek.getDayOfWeekLocale : ', date.GetDayOfWeek.getDayOfWeekLocale('ko') );
console.log( 'GetDayOfWeek.getDayOfWeekLocaleString : ', date.GetDayOfWeek.getDayOfWeekLocaleString('20210512', 'ko') );

console.log('');
console.log('');
console.log( 'GetDayOfMonth.getLastDayOfMonth : ', date.GetDayOfMonth.getLastDayOfMonth() );
console.log( 'GetDayOfMonth.getLastDayOfMonthString : ', date.GetDayOfMonth.getLastDayOfMonthString('20210601') );

console.log('');
console.log('');
console.log( 'UnixTimestamp.currentMillis : ', date.UnixTimestamp.currentMillis() );
console.log( 'UnixTimestamp.millsToDate : ', date.UnixTimestamp.millsToDate( date.UnixTimestamp.currentMillis() ) );
console.log( 'UnixTimestamp.getUnixTimestamp : ', date.UnixTimestamp.getUnixTimestamp() );
console.log( 'UnixTimestamp.timestampToDate : ', date.UnixTimestamp.timestampToDate( date.UnixTimestamp.getUnixTimestamp() ) );
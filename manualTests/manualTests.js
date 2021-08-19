function getMonthDates(date) {
  date.setDate(1);
  const currentMonth = date.getMonth();
  const result = [date.toISOString()];

  while (
    date.setDate(date.getDate() + 1) &&
    new Date(date).getMonth() === currentMonth
  ) {
    result.push(date.toISOString());
  }
  return result;
}
// function getYearDates(date:Date) {
//     const year = date.getFullYear();
//     date.setMonth(0);
//     date.setDate(1);

//     const result = [date.toISOString()];

//     while (date.setDate(date.getDate() + 1) && date.getFullYear() === year) {
//       result.push(date.toISOString());
//     }
//     return result;
//   }

console.log(getMonthDates(new Date()));

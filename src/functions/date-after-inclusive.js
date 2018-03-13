export default (left, right) => {
  if (!left || !right) {
    throw new Error('Expecting a date as the left argument and a date to compare.');
  }
  const leftDate = Date.parse(left);
  const rightDate = Date.parse(right);
  [leftDate, rightDate].forEach((arg) => {
    if (Number.isNaN(arg)) {
      throw new Error('Expecting right argument to be date formatted string.');
    }
  });
  return (leftDate >= rightDate);
};

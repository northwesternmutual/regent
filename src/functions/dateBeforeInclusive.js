export default (input, args) => {
  const constraint = args[0];
  if (!input || !constraint) {
    throw new Error('Expecting a date to input and a date to compare.');
  }
  const inputDate = Date.parse(input);
  const constraintDate = Date.parse(constraint);
  [inputDate, constraintDate].forEach((arg) => {
    if (Number.isNaN(arg)) {
      throw new Error('Expecting arguments to be date formatted string.');
    }
  });
  return (inputDate <= constraintDate);
};

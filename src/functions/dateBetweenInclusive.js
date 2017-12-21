import dateAfterInclusive from './dateAfterInclusive';
import dateBeforeInclusive from './dateBeforeInclusive';

export default (input, args) => {
  const beforeConstraint = args[0];
  const afterConstraint = args[1];
  if (!input || !beforeConstraint || !afterConstraint) {
    throw new Error('Expecting a date to input plus two dates to compare.');
  }
  return (
    dateAfterInclusive(input, [beforeConstraint]) && dateBeforeInclusive(input, [afterConstraint])
  );
};

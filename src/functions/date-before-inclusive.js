import { FUNCTION_DEPRECATION_WARNING } from '../constants';

export default (left, right) => {
  // eslint-disable-next-line
  console.warn(FUNCTION_DEPRECATION_WARNING('date-before-inclusive'));

  if (!left || !right) {
    throw new Error('date-before-inclusive: Left and right are both required for the date-before-inclusive predicate');
  }
  const leftDate = Date.parse(left);
  const rightDate = Date.parse(right);
  [leftDate, rightDate].forEach((arg) => {
    if (Number.isNaN(arg)) {
      throw new Error('date-before-inclusive: Left and right must both be date formatted strings');
    }
  });
  return (leftDate <= rightDate);
};

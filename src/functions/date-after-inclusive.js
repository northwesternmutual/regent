export default (left, right) => {
  if (!left || !right) {
    throw new Error('date-after-inclusive: Left and right are both required for the date-after-inclusive predicate');
  }
  const leftDate = Date.parse(left);
  const rightDate = Date.parse(right);
  [leftDate, rightDate].forEach((arg) => {
    if (Number.isNaN(arg)) {
      throw new Error('date-after-inclusive: Left and right must both be date formatted strings');
    }
  });
  return (leftDate >= rightDate);
};

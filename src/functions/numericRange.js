export default (left, right) => {
  if (right.length !== 2) {
    throw new Error('The right argumrnt to numericRange requires an array of two items.');
  }

  return (left >= right[0] && left <= right[1]);
};

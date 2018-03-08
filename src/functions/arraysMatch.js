// True if all elements in left array exist in right array irrespective of order
export default (left, right) => {
  let result = false;
  if (typeof left !== 'undefined') {
    const sortedLeft = left.sort();
    const sortedRight = right.sort();

    result = JSON.stringify(sortedLeft) === JSON.stringify(sortedRight);
  }
  return result;
};

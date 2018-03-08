// True if all the items in the right array, are also in the left array.
export default (left, right) => {
  let result = false;
  if (typeof left !== 'undefined') {
    const match = left.filter(i => right.find(j => j === i));
    result = match.length === right.length;
  }
  return result;
};

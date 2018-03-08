export default (left, right) => {
  let result = false;
  if (typeof left !== 'undefined') {
    result = left.some(param => (
      right.indexOf(param) !== -1
    ));
  }

  return result;
};

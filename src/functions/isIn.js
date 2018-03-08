export default (left, right) => {
  let result = false;

  if (right.indexOf(left) !== -1) {
    result = true;
  }

  return result;
};

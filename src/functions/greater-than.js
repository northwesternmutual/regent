export default (left, right) => {
  let sanitizedLeft = left;
  if (typeof left === 'string') {
    // Remove $ and , and then parse
    sanitizedLeft = parseFloat(left.replace(/[$,]+/g, ''));
  }

  let result = true;

  if (
    sanitizedLeft &&
    typeof sanitizedLeft === 'number' &&
    !Number.isNaN(sanitizedLeft)
  ) {
    result = left > right;
  } else {
    // nothing was passed in, return false
    result = false;
  }


  return result;
};

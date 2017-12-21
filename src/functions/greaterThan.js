export default (input, args) => {
  let sanitizedInput = input;
  if (typeof input === 'string') {
    // Remove $ and , and then parse
    sanitizedInput = parseFloat(input.replace(/[$,]+/g, ''));
  }

  let result = true;

  if (
    sanitizedInput &&
    typeof sanitizedInput === 'number' &&
    !Number.isNaN(sanitizedInput)
  ) {
    args.forEach((arg) => {
      if (sanitizedInput <= arg) {
        result = false;
      }
    });
  } else {
    // nothing was passed in, return false
    result = false;
  }


  return result;
};

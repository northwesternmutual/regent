export default (input, args) => {
  let result = false;
  if (typeof input !== 'undefined') {
    result = args.some(param => (
      input.indexOf(param) !== -1
    ));
  }

  return result;
};

export default (input, args) => {
  let result = false;

  if (args.indexOf(input) !== -1) {
    result = true;
  }

  return result;
};

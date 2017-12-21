export default (input, args) => {
  let result = true;

  args.forEach((arg) => {
    if (arg !== input) {
      result = false;
    }
  });

  return result;
};

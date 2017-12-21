export default (input, args) => (
  input !== undefined &&
  input !== null &&
  Array.isArray(input) &&
  input.length > args[0]
);

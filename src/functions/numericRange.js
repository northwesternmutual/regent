export default (input, args) => {
  if (args.length !== 2) {
    throw new Error('numeric range needs exactly two arguments');
  }

  return (input >= args[0] && input <= args[1]);
};

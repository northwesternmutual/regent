// True if all the items in the args array, are also in the input array.
export default (input, args) => {
  let result = false;
  if (typeof input !== 'undefined') {
    const match = input.filter(i => args.find(j => j === i));
    result = match.length === args.length;
  }
  return result;
};

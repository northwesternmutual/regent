// True if all elements in input array exist in args array irrespective of order
export default (input, args) => {
  let result = false;
  if (typeof input !== 'undefined') {
    const sortedInput = input.sort();
    const sortedArgs = args.sort();

    result = JSON.stringify(sortedInput) === JSON.stringify(sortedArgs);
  }
  return result;
};

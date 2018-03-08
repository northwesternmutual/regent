export default (left, right) => (
  left !== undefined &&
  left !== null &&
  Array.isArray(left) &&
  left.length > right[0]
);

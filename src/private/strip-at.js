export default function stripAt (arg) {
  return typeof arg === 'string' && arg[0] === '@'
    ? arg.slice(1)
    : arg
}

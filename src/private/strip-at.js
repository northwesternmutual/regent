export default function stripAt (arg) {
  return arg[0] === '@'
    ? arg.slice(1)
    : arg
}

export default function stripAt (arg: string): string {
  if (typeof arg === 'string') {
    return arg && arg[0] === '@'
      ? arg.slice(1)
      : arg
  }
  return arg
}

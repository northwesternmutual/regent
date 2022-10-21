export default function stripAt (arg: any): any {
  return arg && arg[0] === '@'
    ? arg.slice(1)
    : arg
}

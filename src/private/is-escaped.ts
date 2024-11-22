const isEscapedRegex = /^@@/
const isEscaped = (arg: any): Boolean => isEscapedRegex.test(arg)

export default isEscaped

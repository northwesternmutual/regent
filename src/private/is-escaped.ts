const isEscapedRegex = /^@@/
export default (arg: any): Boolean => isEscapedRegex.test(arg)

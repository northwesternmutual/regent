const isEscapedRegex = /^@@/
export default arg => isEscapedRegex.test(arg)

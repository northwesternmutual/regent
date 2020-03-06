import isRule from '../private/is-rule'

export default (...rules) =>
  (data) => {
  // throw if one or more of the rules are
  // not rules
    if (!rules.every(x => isRule(x))) {
      throw new Error('Regent: xor requires all arguments to be a function')
    }

    if (rules.length !== 2) {
      throw Error('Regent: xor must take exactly 2 rules')
    }

    return (rules[0](data) || rules[1](data)) && !(rules[0](data) && rules[1](data))
  }

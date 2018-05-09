import get from 'lodash.get';
import evaluateRule from './evaluate-rule';

export default (obj, data, custom = {}) => {
  let result;
  const notRule = get(obj, 'not');

  if (notRule) {
    result = !evaluateRule(notRule, data, custom);
  } else {
    const action = obj.compose;
    const fxn = rule => (
      evaluateRule(rule, data, custom)
    );

    switch (action) {
      case 'or':
        result = obj.rules.some(fxn);
        break;

      case 'xor':
        if (obj.rules.length !== 2) throw Error('XOR must take exactly 2 rules');
        result = (fxn(obj.rules[0]) && !fxn(obj.rules[1]))
          || (fxn(obj.rules[1]) && !fxn(obj.rules[0]));
        break;

      case 'and':
        result = obj.rules.every(fxn);
        break;

      default:
        result = false;
        break;
    }
  }

  return result;
};

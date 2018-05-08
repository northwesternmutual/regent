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
        result = obj.rules.some(fxn) && !obj.rules.every(fxn);
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

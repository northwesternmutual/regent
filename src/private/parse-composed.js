import get from 'lodash.get';
import evaluateRule from './evaluate-rule';

export default (obj, data, custom = {}) => {
  let result;
  const notRule = get(obj, 'not');

  if (notRule) {
    result = !evaluateRule(notRule, data, custom);
  } else {
    const action = obj.compose;
    switch (action) {
      case 'or':
        result = obj.rules.some(rule => (
          evaluateRule(rule, data, custom)
        ));
        break;

      case 'and':
        result = obj.rules.every(rule => (
          evaluateRule(rule, data, custom)
        ));
        break;

      default:
        result = false;
        break;
    }
  }


  return result;
};

import evaluateRule from './evaluate-rule';

export default (obj, data, custom = {}) => {
  const action = obj.compose;
  let result;
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

    case 'not':
      result = !evaluateRule(obj.rules[0], data, custom);
      break;

    default:
      result = false;
      break;
  }

  return result;
};

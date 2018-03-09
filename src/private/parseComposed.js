import evaluateRule from './evaluateRule';

export default (data, obj, custom = {}) => {
  const action = obj.compose;
  let result;
  switch (action) {
    case 'or':
      result = obj.rules.some(rule => (
        evaluateRule(data, rule, custom)
      ));
      break;

    case 'and':
      result = obj.rules.every(rule => (
        evaluateRule(data, rule, custom)
      ));
      break;

    case 'not':
      result = !evaluateRule(data, obj.rule, custom);
      break;

    default:
      result = false;
      break;
  }

  return result;
};

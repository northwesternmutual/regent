export default (composedRule) => {
  let result = false;
  if (composedRule) {
    if (Object.hasOwnProperty.call(composedRule, ['not'])) {
      result = true;
    } else if (Object.hasOwnProperty.call(composedRule, ['compose'])) {
      result = composedRule !== undefined
        && Object.hasOwnProperty.call(composedRule, ['compose'])
        && typeof composedRule.compose === 'string'
        && Object.hasOwnProperty.call(composedRule, ['rules'])
        && Array.isArray(composedRule.rules) !== 'undefined';
    }
  }

  return result;
};

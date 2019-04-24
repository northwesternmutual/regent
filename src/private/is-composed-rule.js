export default (composedRule = {}) => {
  let result;

  if (Object.hasOwnProperty.call(composedRule, ['not'])) {
    result = true;
  } else {
    result = typeof composedRule.compose === 'string'
        && Object.hasOwnProperty.call(composedRule, ['rules'])
        && Array.isArray(composedRule.rules) === true;
  }

  return result;
};

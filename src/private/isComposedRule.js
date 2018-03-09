export default (composedRule) => { // eslint-disable-line arrow-body-style
  return composedRule !== undefined
    && Object.hasOwnProperty.call(composedRule, ['compose'])
    && typeof composedRule.compose === 'string'
    && Object.hasOwnProperty.call(composedRule, ['rules'])
    && Array.isArray(composedRule.rules) !== 'undefined';
};

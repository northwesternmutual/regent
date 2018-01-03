import get from 'lodash.get';
import FN from './fn';

export const evaluateRule = (obj, rule, custom = {}) => {
  let result;
  if (get(rule, 'compose')) {
    // This is a composed rule so call parse composed
    result = parseComposed(obj, rule, custom); // eslint-disable-line no-use-before-define
  } else {
    // This is a base rule, execute it
    result = FN(rule.fn, custom)(get(obj, rule.key), rule.params);
  }

  return result;
};

export const parseComposed = (data, obj, custom = {}) => {
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

export const findFirst = (custom = {}) => (data, rules) => (
  rules.find(line => line.rules.every(rule => (
    evaluateRule(data, rule, custom)
  )))
);

export const findAll = (custom = {}) => (data, rules) => (
  rules.filter(line => (
    line.rules.every(rule => (
      evaluateRule(data, rule, custom)
    ))
  ))
);

export const rule = (custom = {}) => (data, singleRule) => evaluateRule(data, singleRule, custom);

export const or = (rules) => {
  if (!Array.isArray(rules)) {
    throw new Error('regent.or must be called with an array');
  }

  return ({
    compose: 'or',
    rules,
  });
};

export const and = (rules) => {
  if (!Array.isArray(rules)) {
    throw new Error('regent.and must be called with an array');
  }

  return ({
    compose: 'and',
    rules,
  });
};

export const not = singleRule => ({
  compose: 'not',
  rule: singleRule,
});

export const init = (custom = {}) => ({
  and,
  not,
  or,
  findFirst: findFirst(custom),
  findAll: findAll(custom),
  rule: rule(custom),
});

export default {
  init,
};

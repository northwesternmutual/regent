import get from 'lodash.get';
import set from 'lodash.set';
import FN from './fn';

export const evaluateRule = (obj, rule, custom = {}) => {
  let result;
  if (get(rule, 'compose')) {
    // This is a composed rule so call parse composed
    result = parseComposed(obj, rule, custom); // eslint-disable-line no-use-before-define
  } else {
    // This is a base rule, execute it
    const input = {};
    switch (true) {
      case Array.isArray(rule.key):
        rule.key.forEach(key => set(input, key, get(obj, key)));
        result = FN(rule.fn, custom)(input, rule.params);
        break;
      default:
        result = FN(rule.fn, custom)(get(obj, rule.key), rule.params);
        break;
    }
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

export const isRule = (testRule) => { // eslint-disable-line arrow-body-style
  return testRule !== undefined
    && Object.hasOwnProperty.call(testRule, ['key'])
    && Object.hasOwnProperty.call(testRule, ['fn'])
    && Object.hasOwnProperty.call(testRule, ['params']);
};

export const isComposedRule = (composedRule) => { // eslint-disable-line arrow-body-style
  return composedRule !== undefined
    && Object.hasOwnProperty.call(composedRule, ['compose'])
    && typeof composedRule.compose === 'string'
    && Object.hasOwnProperty.call(composedRule, ['rules'])
    && Array.isArray(composedRule.rules) !== 'undefined';
};

export const explain = (composedRule) => {
  let result = '';
  if (!isComposedRule(composedRule)) {
    if (!isRule(composedRule)) {
      throw new Error('regent.explain must be called with a regent rule');
    }
    const key = Array.isArray(composedRule.key) ? composedRule.key.join(', ') : composedRule.key;
    result = `${key} ${composedRule.fn} '${composedRule.params.join('\', \'')}'`;
  } else {
    result = composedRule.rules.map(currentRule => `(${explain(currentRule)})`).join(` ${composedRule.compose} `);
  }
  return result;
};

export const init = (custom = {}) => ({
  and,
  not,
  or,
  findFirst: findFirst(custom),
  findAll: findAll(custom),
  rule: rule(custom),
  explain,
});

export const crown = init;

export const constants = {
  arrayLengthGreaterThan: 'arrayLengthGreaterThan',
  arraysMatch: 'arraysMatch',
  dateAfterInclusive: 'dateAfterInclusive',
  dateBeforeInclusive: 'dateBeforeInclusive',
  dateBetweenInclusive: 'dateBetweenInclusive',
  empty: 'empty',
  equals: 'equals',
  greaterThan: 'greaterThan',
  isIn: 'isIn',
  match: 'match',
  numericRange: 'numericRange',
  regex: 'regex',
  subString: 'subString',
};

export default {
  constants,
  crown,
  init,
};

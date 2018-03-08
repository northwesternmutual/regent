import get from 'lodash.get';
import isObject from 'lodash.isobject';
import FN from './fn';
import makeArgs from './private/makeArgs';
import isLookup from './private/isLookup';

export const evaluateRule = (obj, rule, custom = {}) => {
  let result;
  if (get(rule, 'compose')) {
    // This is a composed rule so call parse composed
    result = parseComposed(obj, rule, custom); // eslint-disable-line no-use-before-define
  } else {
    // This is a base rule, execute it
    const { left, right } = makeArgs(obj, rule.left, rule.right);
    result = FN(rule.fn, custom)(left, right);
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

export const evaluate = (custom = {}) => (
  (data, singleRule) => evaluateRule(data, singleRule, custom)
);

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
    && Object.hasOwnProperty.call(testRule, ['left'])
    && Object.hasOwnProperty.call(testRule, ['fn'])
    && Object.hasOwnProperty.call(testRule, ['right']);
};

export const isComposedRule = (composedRule) => { // eslint-disable-line arrow-body-style
  return composedRule !== undefined
    && Object.hasOwnProperty.call(composedRule, ['compose'])
    && typeof composedRule.compose === 'string'
    && Object.hasOwnProperty.call(composedRule, ['rules'])
    && Array.isArray(composedRule.rules) !== 'undefined';
};

export const explain = (rule, data) => {
  const { left, right } = makeArgs(data, rule.left, rule.right);
  let leftPart;
  let rightPart;
  // If data is provided then toString will print keys and values
  if (isObject(data)) {
    leftPart = left && left !== rule.left ? `${rule.left}->${JSON.stringify(left)}` : JSON.stringify(rule.left);
    rightPart = right && right !== rule.right ? `${rule.right}->${JSON.stringify(right)}` : JSON.stringify(rule.right);  
  } else {
    leftPart = isLookup(rule.left) ? rule.left : JSON.stringify(rule.left);
    rightPart = isLookup(rule.right) ? rule.right : JSON.stringify(rule.right);
  }

  return `(${leftPart} ${rule.fn} ${rightPart})`;
};

export const init = (custom = {}) => ({
  and,
  not,
  or,
  findFirst: findFirst(custom),
  findAll: findAll(custom),
  evaluate: evaluate(custom),
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

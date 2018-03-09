import isObject from 'lodash.isobject';
import makeArgs from './private/makeArgs';
import isLookup from './private/isLookup';
import evaluateRule from './private/evaluateRule';
import isRule from './private/isRule';
import isComposedRule from './private/isComposedRule';

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

export const explain = (rule, data) => {
  let result = '';
  if (!isComposedRule(rule)) {
    if (!isRule(rule)) {
      throw new Error('regent.explain must be called with a regent rule');
    }
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
  }

  result = `(${rule.rules.map(currentRule => `${explain(currentRule, data)}`).join(` ${rule.compose} `)})`;
  return result;
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

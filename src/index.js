import isObject from 'lodash.isobject';
import makeArgs from './private/make-args';
import isLookup from './private/is-lookup';
import evaluateRule from './private/evaluate-rule';
import isRule from './private/is-rule';
import isComposedRule from './private/is-composed-rule';

export const find = (data, rules, custom = {}) => (
  rules.find(line => line.rules.every(rule => (
    evaluateRule(data, rule, custom)
  )))
);

export const filter = (data, rules, custom = {}) => (
  rules.filter(line => (
    line.rules.every(rule => (
      evaluateRule(data, rule, custom)
    ))
  ))
);

export const evaluate = (data, singleRule, custom = {}) => evaluateRule(data, singleRule, custom);

export const makeRegentFactory = (fn, custom = {}) => (
  (data, singleRule) => fn(data, singleRule, custom)
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
  explain,
  not,
  or,
  evaluate: makeRegentFactory(evaluate, custom),
  filter: makeRegentFactory(filter, custom),
  find: makeRegentFactory(find, custom),
  rule: makeRegentFactory(evaluate, custom),
});

export const crown = init;

export const constants = {
  dateAfterInclusive: 'dateAfterInclusive',
  dateBeforeInclusive: 'dateBeforeInclusive',
  deepEquals: 'deepEquals',
  empty: 'empty',
  equals: 'equals',
  greaterThan: 'greaterThan',
  includes: 'includes',
  lessThan: 'lessThan',
  regex: 'regex',
  typeOf: 'typeOf',
};

export default {
  constants,
  crown,
  init,
};

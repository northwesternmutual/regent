import isObject from 'lodash.isobject';
import get from 'lodash.get';
import makeArgs from './private/make-args';
import isLookup from './private/is-lookup';
import evaluateRule from './private/evaluate-rule';
import isRule from './private/is-rule';
import isComposedRule from './private/is-composed-rule';

export const find = (rules, data, custom = {}) => (
  rules.find(line => evaluateRule(line.rule, data, custom))
);

export const filter = (rules, data, custom = {}) => (
  rules.filter(line => evaluateRule(line.rule, data, custom))
);

export const evaluate = (singleRule, data, custom = {}) => evaluateRule(singleRule, data, custom);

export const makeRegentFactory = (fn, custom = {}) => (
  (rules, data) => fn(rules, data, custom)
);

export const or = (...rules) => ({
  compose: 'or',
  rules,
});

export const xor = (...rules) => {
  if (rules.length !== 2) throw Error('XOR must take exactly 2 rules');
  return {
    compose: 'xor',
    rules,
  };
};

export const and = (...rules) => ({
  compose: 'and',
  rules,
});

export const not = singleRule => ({
  not: singleRule,
});

export const explain = (rule, data) => {
  let result;
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
    const arr = [
      leftPart,
      rule.fn,
      rightPart,
    ].filter(x => x);
    return `(${arr.join(' ')})`;
  }

  if (get(rule, 'not')) {
    // handle "NOT" rules
    result = `NOT ${explain(get(rule, 'not'), data)}`;
  } else {
    result = `(${rule.rules.map(currentRule => `${explain(currentRule, data)}`).join(` ${rule.compose} `)})`;
  }

  return result;
};

export const explainLogic = (rules, data) => (
  rules.map(row => ({
    result: evaluate(row.rule, data),
    because: explain(row.rule, data)
  }))
);

export const init = (custom = {}) => {
  const evalRule = makeRegentFactory(evaluate, custom);
  return ({
    and,
    evaluate: evalRule,
    explain,
    filter: makeRegentFactory(filter, custom),
    find: makeRegentFactory(find, custom),
    not,
    or,
    rule: evalRule,
    xor,
  });
};

export const crown = init;

export const constants = {
  dateAfterInclusive: 'dateAfterInclusive',
  dateBeforeInclusive: 'dateBeforeInclusive',
  deepEquals: 'deepEquals',
  empty: 'empty',
  equals: 'equals',
  greaterThan: 'greaterThan',
  greaterThanOrEquals: 'greaterThanOrEquals',
  includes: 'includes',
  lessThan: 'lessThan',
  lessThanOrEquals: 'lessThanOrEquals',
  regex: 'regex',
  typeOf: 'typeOf',
};

export default {
  constants,
  crown,
  init,
};

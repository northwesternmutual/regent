import assign from 'lodash.assign';
import isarray from 'lodash.isarray';
import { evaluate } from '../index';
import isRule from '../private/is-rule';
import isComposedRule from '../private/is-composed-rule';

export default (left, right, data, custom) => {
  if (!isRule(right) && !isComposedRule(right)) {
    throw new Error('Regent: the right property of an every rule must be a regent rule');
  }

  if (!isarray(left)) {
    return false;
  }

  return left.every(x => evaluate(right, assign({}, data, { __: x }), custom));
};

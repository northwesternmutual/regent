import assign from 'lodash.assign';
import { evaluate } from '../index';
import isRule from '../private/is-rule';

export default (left, right, data, custom) => {
  if (!isRule(right)) {
    throw new Error('Regent: the right property of an every rule must be a regent rule');
  }

  if (!Array.isArray(left)) {
    throw new Error('Regent: the left property of an every rule must be an array');
  }

  return left.some(x => evaluate(right, assign({}, data, { __: x }), custom));
};

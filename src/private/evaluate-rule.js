import makeArgs from './make-args';
import isComposedRule from './is-composed-rule';
import parseComposed from './parse-composed';
import FN from '../fn';

export default (rule, data, custom = {}) => {
  let result;
  if (isComposedRule(rule)) {
    // This is a composed rule so call parse composed
    result = parseComposed(rule, data, custom); // eslint-disable-line no-use-before-define
  } else if (typeof rule === 'function') {
    result = rule(data);
  } else {
    // This is a base rule, execute it
    const { left, right } = makeArgs(data, rule.left, rule.right);
    result = FN(rule.fn, custom)(left, right, data);
  }
  return result;
};

import makeArgs from './make-args';
import isComposedRule from './is-composed-rule';
import parseComposed from './parse-composed';
import FN from '../fn';

export default (rule, obj, custom = {}) => {
  let result;
  if (isComposedRule(rule)) {
    // This is a composed rule so call parse composed
    result = parseComposed(rule, obj, custom); // eslint-disable-line no-use-before-define
  } else {
    // This is a base rule, execute it
    const { left, right } = makeArgs(obj, rule.left, rule.right);
    result = FN(rule.fn, custom)(left, right);
  }
  return result;
};

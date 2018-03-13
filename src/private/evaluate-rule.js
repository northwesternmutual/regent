import get from 'lodash.get';
import makeArgs from './make-args';
import parseComposed from './parse-composed';
import FN from '../fn';

export default (obj, rule, custom = {}) => {
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

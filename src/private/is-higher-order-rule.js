import mem from 'mem';
import isRule from '../private/is-rule';
import isComposedRule from '../private/is-composed-rule';

export default mem(right => isRule(right) || isComposedRule(right));

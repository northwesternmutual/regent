import isRule from '../private/is-rule';
import isComposedRule from '../private/is-composed-rule';

export default right => isRule(right) || isComposedRule(right);

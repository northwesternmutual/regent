import _includes from 'lodash.includes';
import make from '../private/make';

export const includes = (left, right) => _includes(left, right);

export const includesFN = make(includes);

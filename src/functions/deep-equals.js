import isEqual from 'lodash.isequal';
import make from '../private/make';

export const deepEquals = (left, right) => isEqual(left, right);

export const deepEqualsFN = make(deepEquals);

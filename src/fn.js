import assign from 'lodash.assign';
import dateAfterInclusive from './functions/date-after-inclusive';
import dateBeforeInclusive from './functions/date-before-inclusive';
import deepEquals from './functions/deep-equals';
import empty from './functions/empty';
import equals from './functions/equals';
import every from './functions/every';
import greaterThan from './functions/greater-than';
import greaterThanOrEquals from './functions/greater-than-equals';
import includes from './functions/includes';
import lessThan from './functions/less-than';
import lessThanOrEquals from './functions/less-than-equals';
import regex from './functions/regex';
import some from './functions/some';
import typeOf from './functions/type-of';

export default (id, custom) => (
  (left, right, data) => {
    const fn = {
      dateAfterInclusive,
      dateBeforeInclusive,
      deepEquals,
      empty,
      equals,
      '=': equals,
      every,
      greaterThan,
      '>': greaterThan,
      greaterThanOrEquals,
      '>=': greaterThanOrEquals,
      includes,
      lessThan,
      '<': lessThan,
      lessThanOrEquals,
      '<=': lessThanOrEquals,
      regex,
      some,
      typeOf,
    };

    let f = id;
    let result = false;

    try {
      if (id.indexOf('!') === 0) {
        f = id.replace('!', '');
        result = !assign({}, fn, custom)[f](left, right, data, custom);
      } else {
        result = assign({}, fn, custom)[f](left, right, data, custom);
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(`regent error:
        fn: "${f}"
        left: "${JSON.stringify(left)}"
        right: "${JSON.stringify(right)}"
        error: ${e}
      `);
    }

    return result;
  }
);

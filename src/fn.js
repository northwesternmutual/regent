import arrayLengthGreaterThan from './functions/arrayLengthGreaterThan';
import arraysMatch from './functions/arraysMatch';
import dateAfterInclusive from './functions/dateAfterInclusive';
import dateBeforeInclusive from './functions/dateBeforeInclusive';
import dateBetweenInclusive from './functions/dateBetweenInclusive';
import empty from './functions/empty';
import equals from './functions/equals';
import greaterThan from './functions/greaterThan';
import isIn from './functions/isIn';
import match from './functions/match';
import numericRange from './functions/numericRange';
import regex from './functions/regex';

// Aliases
const inArray = isIn;

const fn = {
  arrayLengthGreaterThan,
  arraysMatch,
  dateAfterInclusive,
  dateBeforeInclusive,
  dateBetweenInclusive,
  empty,
  equals,
  greaterThan,
  inArray,
  isIn,
  match,
  numericRange,
  regex,
};

export default (id, custom) => (
  (left, right) => {
    let fnid = id;
    let result = false;

    try {
      if (id.indexOf('!') === 0) {
        fnid = id.replace('!', '');
        result = !Object.assign({}, fn, custom)[fnid](left, right);
      } else {
        result = Object.assign({}, fn, custom)[fnid](left, right);
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(`regent error:
        fn: "${fnid}"
        left: "${JSON.stringify(left)}"
        right: "${JSON.stringify(right)}"
        error: ${e}
      `);
    }

    return result;
  }
);

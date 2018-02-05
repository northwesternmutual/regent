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
import subString from './functions/subString';

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
  subString,
};

export default (id, custom) => (
  (input, args) => {
    let fnid = id;
    let result = false;

    try {
      if (id.indexOf('!') === 0) {
        fnid = id.replace('!', '');
        result = !Object.assign({}, fn, custom)[fnid](input, args);
      } else {
        result = Object.assign({}, fn, custom)[fnid](input, args);
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(`regent error:
        fn: "${fnid}"
        input: "${JSON.stringify(input)}"
        args: "${JSON.stringify(args)}"
        error: ${e}
      `);
    }

    return result;
  }
);

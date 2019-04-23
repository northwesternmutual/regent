import dateBeforeInclusive from './date-before-inclusive';

describe('dateBeforeInclusive', () => {
  it('dateBeforeInclusive should return true if left is less than the constraint.', () => {
    const examine = '01/01/1975';
    const constraint = '01/02/1975';
    const expected = true;
    const actual = dateBeforeInclusive(examine, constraint);
    expect(actual).toEqual(expected);
  });
  it('dateBeforeInclusive should return true for equal dates', () => {
    const examine = '01/02/1975';
    const constraint = '01/02/1975';
    const expected = true;
    const actual = dateBeforeInclusive(examine, constraint);
    expect(actual).toEqual(expected);
  });
  it('dateBeforeInclusive should return false for a date greater than the left date.', () => {
    const examine = '01/02/1975';
    const constraint = '01/01/1975';
    const expected = false;
    const actual = dateBeforeInclusive(examine, constraint);
    expect(actual).toEqual(expected);
  });
  it('dateBeforeInclusive should throw an error for invalid arguments.', () => {
    const nonDateString = 'not a date';
    const number = 3513513155;
    const bool = true;
    const valid = '01/01/1975';
    expect(() => dateBeforeInclusive(nonDateString, valid)).toThrow();
    expect(() => dateBeforeInclusive(number, valid)).toThrow();
    expect(() => dateBeforeInclusive(bool, valid)).toThrow();
    expect(() => dateBeforeInclusive(undefined, valid)).toThrow();
    expect(() => dateBeforeInclusive(valid, undefined)).toThrow();
  });
});


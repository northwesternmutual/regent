import equals from './equals';

describe('equals', () => {
  it('equals should be a function', () => {
    expect(typeof equals).toEqual('function');
  });

  it('equals should return true if the left is in all of the arguments', () => {
    const left = 'hello';
    const right = 'hello';
    const acutal = equals(left, right);
    const expected = true;
    expect(acutal).toEqual(expected);
  });

  it('equals should return false if left does not match all of the arguments', () => {
    const left = 'hello';
    const right = 'world';
    const acutal = equals(left, right);
    const expected = false;
    expect(acutal).toEqual(expected);
  });
});


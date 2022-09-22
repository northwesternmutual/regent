import regexFn, { regex } from './regex'

describe('3.x.x - regexFn should work in functional style', () => {
  it('should be a function', () => {
    const actual = typeof regexFn
    const expected = 'function'

    expect(actual).toEqual(expected)
  })

  it('should perform regexFn', () => {
    const data = {
      foo: 'hello'
    }

    const RULE = regexFn('@foo', /^hello/)
    const actual = RULE(data)
    const expected = true

    expect(actual).toEqual(expected)
  })
})

describe('regex', () => {
  it('regex should be a function', () => {
    expect(typeof regex).toEqual('function')
  })

  it('regex should return true if the left matches the regex provided in the right', () => {
    const left = 'hello'
    const right = /^hello/
    const actual = regex(left, right)
    const expected = true

    expect(actual).toEqual(expected)
  })

  it('regex should return true if the left matches the regex provided in the right', () => {
    const left = '12hello45'
    const right = /[a-z]+/
    const actual = regex(left, right)
    const expected = true

    expect(actual).toEqual(expected)
  })

  it('regex should return false if there is no match', () => {
    const left = '12hello45'
    const right = /[A-Z]+/
    const actual = regex(left, right)
    const expected = false

    expect(actual).toEqual(expected)
  })

  it('regex should pass documentation examples', () => {
    expect(regex('hello world', /world/)).toEqual(true)
    expect(regex('baz123', /[a-z]+[0-9]+/)).toEqual(true)
    expect(regex('123baz', /[a-z]+[0-9]+/)).toEqual(false)
  })

  it('when the toJson method is called it should return a json representation of the rule.', () => {
    const MY_RULE = regexFn('@foo', 'a')

    const actual = MY_RULE.toJson()
    const expected = JSON.stringify({ regex: ['@foo', 'a'] })

    expect(actual).toEqual(expected)
  })
})

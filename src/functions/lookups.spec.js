import lookups from './lookups'
import equals from './equals'
import and from './and'
import not from './not'
import some from './some'

describe('lookups', () => {
  it('should be a function', () => {
    const actual = typeof lookups
    const expected = 'function'

    expect(actual).toEqual(expected)
  })

  it('should get the field from a single rule.', () => {
    const foo = equals('@path.to.foo', 'foo')
    const expected = ['@path.to.foo']
    const actual = lookups(foo)

    expect(actual).toEqual(expected)
  })

  it('should get the lookups from a rule composition', () => {
    const foo = equals('@path.to.foo', 'foo')
    const bar = equals('@path.to.bar', 'bar')
    const expected = ['@path.to.foo', '@path.to.bar']
    const actual = lookups(and(foo, bar))

    expect(actual).toEqual(expected)
  })

  it('should get the lookups from a rule when there is more than one lookup', () => {
    const fooBar = equals('@path.to.foo', '@path.to.bar')
    const expected = ['@path.to.foo', '@path.to.bar']
    const actual = lookups(fooBar)

    expect(actual).toEqual(expected)
  })

  it('should get the lookups from a rule composition where each rule contains more than one lookup', () => {
    const fooBar = equals('@path.to.foo', '@path.to.bar')
    const goo = equals('@some.path.to.goo', 'goo')
    const expected = ['@path.to.foo', '@path.to.bar', '@some.path.to.goo']
    const actual = lookups(and(fooBar, not(goo)))

    expect(actual).toEqual(expected)
  })

  it('should get the lookups from a contextual rule', () => {
    const fooBar = equals('@__.path.to.foo')

    const expected = ['@path.to.array', '@__.path.to.foo']
    const actual = lookups(some('@path.to.array', fooBar))

    expect(actual).toEqual(expected)
  })
})

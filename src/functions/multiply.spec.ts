import multiply from './multiply'
import plus from './plus'
import lessThanOrEquals from './less-than-equals'

describe('multiply', () => {
  it('multiply should be a function', () => {
    expect(typeof multiply).toEqual('function')
  })

  it('multiply should return the product of left and right when each are values.', () => {
    const left = 5
    const right = 6
    const actual = multiply(left, right)({})
    const expected = 30
    expect(actual).toEqual(expected)
  })

  it('multiply should return the product of left and right when each are lenses.', () => {
    const left = '@a'
    const right = '@b'
    const actual = multiply(left, right)({ a: 5, b: 6 })
    const expected = 30
    expect(actual).toEqual(expected)
  })

  it('multiply should accept other optics as input.', () => {
    const C_RATIO = 5 / 9
    const F_CONST = 32
    const C_TO_F = plus(multiply('@temperature', C_RATIO), F_CONST)
    const FREEZING = lessThanOrEquals(C_TO_F, 32)

    expect(FREEZING({ temperature: 0 })).toBe(true)
    expect(FREEZING({ temperature: 1 })).toBe(false)
  })

  it('should produce valid JSON when the .toJson method is invoked', () => {
    const data = { temperature: 0 }
    const C_RATIO = 5 / 9
    const F_CONST = 32
    const C_TO_F = plus(multiply('@temperature', C_RATIO), F_CONST)
    const FREEZING = lessThanOrEquals(C_TO_F, 32)

    const expected = JSON.stringify({
      lessThanOrEquals: [{ plus: [{ multiply: ['@temperature -> 0', 5 / 9] }, 32] }, 32]
    })

    const actual = FREEZING.toJson(data)

    expect(actual).toEqual(expected)
  })
})

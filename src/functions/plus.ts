import optic from './optic'

export function plus (left: any, right: any): any {
  return left + right // eslint-disable-line
}

/**
 * An optic that returns the result of the addition operator.
 *
 * @param  {any} left
 * @param  {any} right
 * @returns any
 * @example
 * import { plus, greaterThanOrEquals } from regent
 *
 * const TEMP = plus('@temperature', '@temperatureIncrease')
 * const UNSAFE = greaterThanOrEquals(TEMP, 90)
 *
 * UNSAFE({ temperature: 70, temperatureIncrease: 30 })
 * // => true
 *
 */
export default optic(plus, 'plus')

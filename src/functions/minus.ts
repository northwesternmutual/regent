import { RegentFn } from '../interfaces'
import custom from './custom'

export function minus (left: any, right: any): any {
  return left - right // eslint-disable-line
}

/**
 * An optic that returns the result of the subtraction operator.
 *
 * @param  {any} left
 * @param  {any} right
 * @returns any
 * @example
 * import { minus, lessThan } from regent
 *
 * const TEMP = minus('@temperature', '@temperatureDrop')
 * const FREEZING = lessThan(TEMP, 32)
 *
 * FREEZING({ temperature: 40, temperatureDrop: 8 })
 * // => true
 *
 */
export default custom(minus, RegentFn.Optic, 'minus')

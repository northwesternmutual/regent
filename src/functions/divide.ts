import { RegentFn } from '../interfaces'
import custom from './custom'

export function divide (left: any, right: any): any {
  return left / right // eslint-disable-line
}

/**
 * An optic that returns the result of the division operator.
 *
 * @param  {any} left
 * @param  {any} right
 * @returns any
 * @example
 * import { divide, lessThan, greaterThan, or, not } from regent
 *
 * const HUMIDITY = divide('@waterVapor', '@waterContent')
 * const LOW = lessThan(HUMIDITY, 0.3)
 * const HIGH = greaterThan(HUMIDITY, 0.5)
 * const COMFORTABLE = not(or(LOW, HIGH))
 *
 * COMFORTABLE({ waterVapor: 1000, waterContent: 2600 })
 * // => true
 *
 */
export default custom(divide, RegentFn.Optic, 'divide')

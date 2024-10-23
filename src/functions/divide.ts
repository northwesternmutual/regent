import { FactoryArg } from '../interfaces'
import optic from './optic'

export function divide (left: FactoryArg, right: FactoryArg): unknown {
  return (left as number) / (right as number)
}

/**
 * An optic that returns the result of the division operator.
 *
 * @param  {unknown} left
 * @param  {unknown} right
 * @returns unknown
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
export default optic(divide, 'divide')

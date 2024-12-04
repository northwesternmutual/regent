import { type FactoryArg } from '../interfaces'
import optic from './optic'

export function plus (left: FactoryArg, right: FactoryArg): FactoryArg {
  return (left as number) + (right as number)
}

/**
 * An optic that returns the result of the addition operator.
 *
 * @param  {unknown} left
 * @param  {unknown} right
 * @returns unknown
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

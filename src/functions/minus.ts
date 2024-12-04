import { type FactoryArg } from '../interfaces'
import optic from './optic'

export function minus (left: FactoryArg, right: FactoryArg): FactoryArg {
  return (left as number) - (right as number)
}

/**
 * An optic that returns the result of the subtraction operator.
 *
 * @param  {unknown} left
 * @param  {unknown} right
 * @returns unknown
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
export default optic(minus, 'minus')

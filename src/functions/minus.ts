import optic from './optic'

export function minus (left: any, right: any): any {
  return left - right
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
export default optic(minus, 'minus')

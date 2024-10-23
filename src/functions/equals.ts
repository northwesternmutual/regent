import make from './make'
import { FactoryArg } from '../interfaces'

export const equals = (left: FactoryArg, right: FactoryArg): boolean => left === right

/**
 * A predicate that returns true if the left argument strictly equals the right argument
 *
 * @param  {FactoryArg} left
 * @param  {FactoryArg} right
 * @returns boolean
 * @example
 * import { equals } from regent
 *
 * const IS_SUNNY = equals('@weatherType', 'sunny')
 * const IS_RAINING = equals('raining', '@weatherType')
 * const SAME_WEATHER_TOMORROW = equals('@today.weatherType', '@tomorrow.weatherType')
 *
 * IS_SUNNY({ weatherType: 'sunny' })
 * // => true
 *
 * IS_RAINING({ weatherType: 'raining' })
 * // => true
 *
 * SAME_WEATHER_TOMORROW({
 *   today: {
 *     weatherType: 'sunny'
 *   },
 *   tomorrow: {
 *     weatherType: 'sunny'
 *   }
 * })
 * // => true
 */
export default make(equals, 'equals')

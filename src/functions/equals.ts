import make from './make'
import { FactoryArgs } from '../interfaces'

export const equals = (left: FactoryArgs, right: FactoryArgs): boolean => left === right

/**
 * A predicate that returns true if the left argument strictly equals the right argument
 *
 * @param  {FactoryArgs} left
 * @param  {FactoryArgs} right
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

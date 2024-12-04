import andFn from './functions/and'
import emptyFn from './functions/empty'
import equalsFn from './functions/equals'
import everyFn from './functions/every'
import filterFn from './functions/filter'
import findFn from './functions/find'
import greaterThanOrEqualsFn from './functions/greater-than-equals'
import greaterThanFn from './functions/greater-than'
import parseFn from './functions/parse'
import lessThanOrEqualsFn from './functions/less-than-equals'
import lessThanFn from './functions/less-than'
import predicateFn from './functions/predicate'
import opticFn from './functions/optic'
import makeFn from './functions/make'
import noneFn from './functions/none'
import notFn from './functions/not'
import orFn from './functions/or'
import regexFn from './functions/regex'
import someFn from './functions/some'
import typeOfFn from './functions/type-of'
import xorFn from './functions/xor'

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
export const and = andFn

export const empty = emptyFn

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
export const equals = equalsFn

export const every = everyFn
export const filter = filterFn
export const find = findFn
export const greaterThanOrEquals = greaterThanOrEqualsFn
export const greaterThan = greaterThanFn
export const parse = parseFn
export const lessThanOrEquals = lessThanOrEqualsFn
export const lessThan = lessThanFn
export const predicate = predicateFn
export const optic = opticFn
export const make = makeFn
export const none = noneFn
export const not = notFn
export const or = orFn
export const regex = regexFn
export const some = someFn
export const typeOf = typeOfFn
export const xor = xorFn

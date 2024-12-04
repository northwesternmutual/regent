import andFn from './functions/and'
import divideFn from './functions/divide'
import emptyFn from './functions/empty'
import equalsFn from './functions/equals'
import everyFn from './functions/every'
import filterFn from './functions/filter'
import findFn from './functions/find'
import greaterThanFn from './functions/greater-than'
import greaterThanOrEqualsFn from './functions/greater-than-equals'
import lessThanFn from './functions/less-than'
import lessThanOrEqualsFn from './functions/less-than-equals'
import makeFn from './functions/make'
import minusFn from './functions/minus'
import multiplyFn from './functions/multiply'
import noneFn from './functions/none'
import notFn from './functions/not'
import opticFn from './functions/optic'
import orFn from './functions/or'
import parseFn from './functions/parse'
import plusFn from './functions/plus'
import predicateFn from './functions/predicate'
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

/**
 * A predicate that returns true if the array is empty
 *
 * @param  {FactoryArg} array
 * @returns boolean
 * @example
 * import { empty } from regent
 *
 * const IS_EMPTY = empty('@items')
 *
 * IS_EMPTY({ items: [] })
 * // => true
 */
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

/**
 * A predicate that returns true if the left argument is greater than the right argument
 *
 * @param  {FactoryArg} left
 * @param  {FactoryArg} right
 * @returns boolean
 * @example
 * import { greaterThan } from regent
 *
 * const IS_GREATER = greaterThan('@value', 10)
 *
 * IS_GREATER({ value: 15 })
 * // => true
 */
export const greaterThan = greaterThanFn

export const parse = parseFn
export const lessThanOrEquals = lessThanOrEqualsFn

/**
 * A predicate that returns true if the left argument is less than the right argument
 *
 * @param  {FactoryArg} left
 * @param  {FactoryArg} right
 * @returns boolean
 * @example
 * import { lessThan } from regent
 *
 * const IS_LESS = lessThan('@value', 10)
 *
 * IS_LESS({ value: 5 })
 * // => true
 */
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
export const plus = plusFn
export const minus = minusFn
export const multiply = multiplyFn
export const divide = divideFn

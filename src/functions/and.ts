import { RegentFn } from '../interfaces'
import custom from './custom'

function and (...bools: boolean[]): boolean {
  // The last argument is data. Don't use that.
  return bools.every((bool, i) => i < bools.length - 1 ? bool : true)
}

/**
 * Creates a composite regent rule that returns true if all the provided rules evaluate to true
 *
 * @param  {Rule[]} rules Any number of valid regent rules
 * @returns A regent Rule that returns true if all the provided rules evaluate to true
 * @example
 *
 * import { greaterThan, equals, and } from 'regent'
 *
 * const IS_RAINING = equals('@isRaining', true)
 * const IS_WARM = greaterThan('@temperature', 68)
 * const IS_RAINING_AND_WARM = and(IS_RAINING, IS_WARM)
 *
 *  IS_RAINING_AND_WARM({ isRaining: true, temperature: 70 })
 * // => true
 */
export default custom(and, RegentFn.Rule, 'and')

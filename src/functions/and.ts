import evaluateRule from '../private/evaluate-rule'
import attachToJson from '../private/attach-to-json'
import { Rule, RuleFunction } from '../interfaces'
/**
 * Creates a composite regent rule that returns true if all the provided rules evaluate to true
 *
 * @param  {Rule[]} Rule Any number of valid regent rules
 * @returns A regent RuleFunction that returns true if all the provided rules evaluate to true
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
export default (...rules: Rule[]): RuleFunction => {
  return attachToJson(function and (data: object): boolean {
    return rules.every(x => evaluateRule(x, data))
  }, rules, 'and')
}

import evaluateRule from '../private/evaluate-rule'
import makeWithContext from '../private/make-with-context'
import { RuleFunction } from '../interfaces'
/**
 * @param   {any[]} left
 * @param   {RuleFunction} right
 * @param   {string} context
 * @param   {object} data
 * @returns {boolean}
 * @example
 * import { every, equals } from regent
 *
 * // In this rule the `__` refers to the current iteration of the `thisWeek` array
 * const IS_SUNNY = equals('@__.weatherType', 'sunny')
 * const NEXT_THREE_DAYS_ARE_SUNNY = every('@thisWeek', IS_SUNNY, '__')
 *
 * NEXT_THREE_DAYS_ARE_SUNNY({
 *     thisWeek: [
 *       { weatherType: 'sunny' },
 *       { weatherType: 'sunny' },
 *       { weatherType: 'sunny' }
 *     ]
 *   }
 * )
 * // => true
 */
export const every = (left: any[], right: RuleFunction, context: string, data: object): boolean => {
  if (!Array.isArray(left)) {
    return false
  }

  return left.every(x => evaluateRule(right, { ...data, [context]: x }))
}

export default makeWithContext(every, 'every')

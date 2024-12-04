import make from './make'
/**
 * A predicate that returns true if the provided input is `undefined`, `null`, `'undefined'`, or `''`
 *
 * @param   {unknown} input? Any value
 * @returns {boolean} True if input is `undefined`, `null`, `'undefined'`, or `''`
 * @example
 *
 * import { empty } from regent
 *
 * const NO_PRECIPITATION = empty('@precipitationTypes')
 *
 * NO_PRECIPITATION({ precipitationTypes: null })
 * // => true
 *
 * NO_PRECIPITATION({ })
 * // => true
 *
 * NO_PRECIPITATION({ precipitationTypes: 'undefined' })
 * // => true
 *
 * NO_PRECIPITATION({ precipitationTypes: '' })
 * // => true
 *
 * NO_PRECIPITATION({ precipitationTypes: ['rain] })
 * // => false
 */
export const empty = (input?: string): boolean => (
  input === undefined ||
  input === null ||
  input === 'undefined' ||
  input === ''
)

export default make(empty, 'empty')

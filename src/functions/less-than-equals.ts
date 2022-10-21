import make from './make'
import { PredicateArgs } from '../interfaces'

export const lessThanOrEquals = (left: PredicateArgs, right: PredicateArgs): boolean => left <= right

export default make(lessThanOrEquals, 'lessThanOrEquals')

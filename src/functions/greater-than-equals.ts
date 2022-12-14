import make from './make'
import { PredicateArgs } from '../interfaces'

export const greaterThanOrEquals = (left: PredicateArgs, right: PredicateArgs): boolean => left >= right

export default make(greaterThanOrEquals, 'greaterThanOrEquals')

import make from './make'
import { PredicateArgs } from '../interfaces'

export const greaterThan = (left: PredicateArgs, right: PredicateArgs): boolean => left > right

export default make(greaterThan, 'greaterThan')

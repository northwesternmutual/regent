import make from './make'
import { PredicateArgs } from '../interfaces'

export const lessThan = (left: PredicateArgs, right: PredicateArgs): boolean => left < right
export default make(lessThan, 'lessThan')

import make from './make'
import { PredicateArgs } from '../interfaces'

export const equals = (left: PredicateArgs, right: PredicateArgs): boolean => left === right

export default make(equals, 'equals')

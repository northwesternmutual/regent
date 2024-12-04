import make from './make'
import { FactoryArg } from '../interfaces'

export const lessThanOrEquals = (left: FactoryArg, right: FactoryArg): boolean => left <= right

export default make(lessThanOrEquals, 'lessThanOrEquals')

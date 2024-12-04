import make from './make'
import { FactoryArg } from '../interfaces'

export const greaterThanOrEquals = (left: FactoryArg, right: FactoryArg): boolean => left >= right

export default make(greaterThanOrEquals, 'greaterThanOrEquals')

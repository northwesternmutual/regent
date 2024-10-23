import make from './make'
import { FactoryArg } from '../interfaces'

export const greaterThan = (left: FactoryArg, right: FactoryArg): boolean => left > right

export default make(greaterThan, 'greaterThan')

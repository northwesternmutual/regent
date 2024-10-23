import make from './make'
import { FactoryArg } from '../interfaces'

export const lessThan = (left: FactoryArg, right: FactoryArg): boolean => left < right
export default make(lessThan, 'lessThan')

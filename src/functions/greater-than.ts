import make from './make'
import { FactoryArgs } from '../interfaces'

export const greaterThan = (left: FactoryArgs, right: FactoryArgs): boolean => left > right

export default make(greaterThan, 'greaterThan')

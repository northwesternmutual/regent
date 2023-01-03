import make from './make'
import { FactoryArgs } from '../interfaces'

export const lessThan = (left: FactoryArgs, right: FactoryArgs): boolean => left < right
export default make(lessThan, 'lessThan')

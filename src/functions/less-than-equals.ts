import make from './make'
import { FactoryArgs } from '../interfaces'

export const lessThanOrEquals = (left: FactoryArgs, right: FactoryArgs): boolean => left <= right

export default make(lessThanOrEquals, 'lessThanOrEquals')

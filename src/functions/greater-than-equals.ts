import make from './make'
import { FactoryArgs } from '../interfaces'

export const greaterThanOrEquals = (left: FactoryArgs, right: FactoryArgs): boolean => left >= right

export default make(greaterThanOrEquals, 'greaterThanOrEquals')

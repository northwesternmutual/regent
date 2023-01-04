/**
 * Lense indicates a JavaScript object path that will be resolved by regent.
 */
export type Lense = `@${string}`

export enum RegentFn {
  Rule = 'Rule',
  Optic = 'Optic'
}

/**
 * This type is a function that has to be called with data
 * that returns a boolean and also has a toJson method
 * on it that takes no parameters and returns a rule
 * expressed in the portable JSON format
 */
export interface Rule {
  (data: any): boolean
  type: RegentFn
  toJson: (data?: any) => string
}

/**
 * This type is a function that has to be called with data
 * and returns any value. It also has a toJson method
 * on it that takes no parameters. The toJson method returns the optic
 * expressed in the portable JSON format
 */
export interface Optic {
  (data: any): any
  type: RegentFn
  toJson: (data?: any) => string
}

/**
 * FactoryArgs are the expected types provided as input to all Predicate and Optics factories.
 */
export type FactoryArgs =
  Lense |
  Rule |
  Optic |
  any

/**
 * Predicates are factory functions that return a Rule.
 */
export type Predicate = (...args: FactoryArgs[]) => Rule

/**
 * Optics are factory functions that return an Optic.
 */
export type Optics = (...args: FactoryArgs[]) => Optic

/**
 * LogicRow is the type argument expected by Regent queries.
 */
export interface LogicRow {
  rule: Rule
  [x: string | number | symbol]: unknown
}

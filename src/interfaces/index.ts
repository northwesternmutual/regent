/**
 * This type is a function that has to be called with data
 * that returns a boolean and also has a toJson method
 * on it that takes no parameters and returns a rule
 * expressed in the portable JSON format
 */
export interface Rule {
  (data: unknown): boolean
  type: 'Rule'
  toJson: (data?: unknown) => string
}

/**
 * This type is a function that has to be called with data
 * and returns any value. It also has a toJson method
 * on it that takes no parameters. The toJson method returns the optic
 * expressed in the portable JSON format
 */
export interface Optic {
  (data: unknown): unknown
  type: 'Optic'
  toJson: (data?: unknown) => string
}

/**
 * FactoryArg are the expected types provided as input to all Predicate and Optics factories.
 */
export type FactoryArg =
  Rule |
  Optic |
  string |
  string[] |
  number |
  number[] |
  boolean |
  boolean[] |
  RegExp

/**
 * Predicates are factory functions that return a Rule.
 */
export type Predicate = (...args: FactoryArg[]) => Rule

/**
 * Optics are factory functions that return an Optic.
 */
export type Optics = (...args: FactoryArg[]) => Optic

/**
 * LogicRow is the type argument expected by Regent queries.
 */
export interface LogicRowObj {
  rule: Rule
  [x: string | number | symbol]: unknown
}

/**
 * Child of Logic Tables, used in regent find/filter
 */
export type LogicRow = LogicRowObj | LogicRowFn | LogicRow[]

/**
 * LogicRowFn a function that accepts data and returns LogicRowObj or LogicRow[]
 */
export type LogicRowFn = (data: unknown) => LogicRowObj | LogicRow[]

export type EscapedString = `@@${string}`

export type Lookup = `@${string}`

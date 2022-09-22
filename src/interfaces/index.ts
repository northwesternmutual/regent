/**
 * This type is a function that has to be called with data
 * that returns a boolean and also has a toJson method
 * on it that takes no parameters and returns a rule
 * expressed in the portable JSON format
 */
export type RuleFunction = {
  (data: any): boolean;
  toJson: () => string;
}

export type Rule = RuleFunction | boolean

export type PredicateArgs = string | number | boolean

export interface LogicRow {
  rule: Rule;
  [x: string | number | symbol]: unknown;
}

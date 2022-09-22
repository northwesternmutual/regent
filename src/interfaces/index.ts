export type RuleFunction = {
  (data: any): boolean;
  toJson: () => String;
}
export type Rule = RuleFunction | Boolean
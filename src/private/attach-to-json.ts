import { Rule } from '../interfaces'

export default function attachToJson (fn: any, rules: Rule[], name): any {
  const ruleJson = { [name]: [] }

  rules.forEach((rule: Rule) => {
    if (typeof rule === 'boolean') {
      ruleJson[name].push(rule)
    } else {
      ruleJson[name].push(JSON.parse(rule.toJson()))
    }
  })

  fn.toJson = () => JSON.stringify(ruleJson)

  return fn
}

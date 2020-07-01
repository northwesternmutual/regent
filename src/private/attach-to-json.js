export default function attachToJson (fn, rules, name) {
  const ruleJson = { [name]: [] }

  rules.forEach((rule) => {
    if (typeof rule === 'boolean') {
      ruleJson[name].push(rule)
    } else {
      ruleJson[name].push(JSON.parse(rule.toJson()))
    }
  })

  fn.toJson = () => JSON.stringify(ruleJson)

  return fn
}

export default function attachToJson (fn, rules) {
  const ruleJson = { [fn.name]: [] }

  rules.forEach((rule) => {
    ruleJson[fn.name].push(JSON.parse(rule.toJson()))
  })

  fn.toJson = () => JSON.stringify(ruleJson)

  return fn
}

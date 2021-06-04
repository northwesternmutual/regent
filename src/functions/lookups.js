function fields (rule) {
  const lookups = []

  function collectLookups (value) {
    if (typeof value === 'string' && value.charAt(0) === '@') {
      lookups.push(value)
    }
  };

  function walk (rule) {
    collectLookups(rule)
    let args

    if (typeof rule !== 'string' && rule.length) {
      args = rule
    }

    if (typeof rule === 'object') {
      args = Object.keys(rule).map((k) => rule[k])
    }

    if (args && args.length > 0) {
      args.forEach((arg) => {
        walk(arg)
      })
    }
  };

  if (rule.toJson) {
    walk(JSON.parse(rule.toJson()))
  } else {
    walk(JSON.parse(rule))
  }

  return lookups
}

export default fields

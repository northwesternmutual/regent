const get = (object, keys) => {
  if (!object) { object = {} }

  keys = Array.isArray(keys) ? keys : `${keys}`
    .replace(/\[['"]?([\w\d-]+)['"]?\]/g, '.$1')
    .split('.')
    .filter(x => x)

  object = object[keys[0]]

  if (object && keys.length > 1) {
    return get(object, keys.slice(1))
  }

  return object
}

export default get

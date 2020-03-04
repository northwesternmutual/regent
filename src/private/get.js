const get = (object, keys) => {
  keys = Array.isArray(keys) ? keys : keys.replace(/\[(['"]?)([\w\d-]+)(['"]?)\]/g, '.$2').split('.')
  object = object[keys[0]]
  if (object && keys.length > 1) {
    return get(object, keys.slice(1))
  }
  return object
}

export default get

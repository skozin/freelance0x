
export default function mapValues(obj, fn) {
  let result = {}
  for (let key in obj) {
    result[key] = fn(obj[key])
  }
  return result
}

/**
 * Generate URL search param from object
 * ex: { hello: 'world', make: "right" } => hello=world&make=right
 */
export const  serializeParam = (obj: Record<string, any>): string => {
  
  // filter out the object key that has no value. eg: empty string
  let resolveObj = {}
  Object.entries(obj).forEach(([key, value]) => {
    if (obj[key]) {
      resolveObj = {...resolveObj, [key]: value}
    }
  })

  const params = new URLSearchParams(resolveObj)
  return params.toString()
}
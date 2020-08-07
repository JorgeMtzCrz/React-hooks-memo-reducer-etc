export default function composeData(args) {
  const data = {}
  for (const key in args) {
    data[key] = args[key]['value']
  }
  return data
}

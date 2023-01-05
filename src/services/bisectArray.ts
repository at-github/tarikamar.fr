export default function bisectArray(array: any[], limit: number) {
  return [
    array.slice(0, limit)
    , array.slice(limit)
  ]
}

import bisectArray from '../../../services/bisectArray'

test('Return 2 arrays, even arg is empty', () => {
  expect(bisectArray([], 0)).toStrictEqual([[], []])
})

test('No limit put items in the second array', () => {
  expect(bisectArray([1, 2, 3, 4], 0))
    .toStrictEqual([[], [1, 2, 3, 4]])
})

test('Limit = length of the array, all items in the first array', () => {
  expect(bisectArray([1, 2, 3, 4], 4))
    .toStrictEqual([[1, 2, 3, 4], []])
})

test('Split array', () => {
  expect(bisectArray([1, 2, 3, 4], 1))
    .toStrictEqual([[1], [2, 3, 4]])
})

test('Works with negative value', () => {
  expect(bisectArray([1, 2, 3, 4], -1))
    .toStrictEqual([[1, 2, 3], [4]])
})

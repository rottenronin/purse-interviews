import {
  findFirstAvailableTable,
  findFirstAvailableTableAsync,
} from '../../answers/Challenge1'

describe('Challenge 1: sync func', () => {
  it('should find empty table in sync mode', () => {
    const index = findFirstAvailableTable(
      [2, 3, 4, 0, 8, 10]
    )
    // at index 3 the numbers of customer is 0
    expect(index).toBe(3)
  })

  it ('should return -1 if no table is empty', () => {
    const index = findFirstAvailableTable(
      [2, 3, 4, 8, 10]
    )
    expect(index).toBe(-1)
  })
})

describe('Challenge 1: async func', () => {
  it('should find empty table in async mode', () => {
    let called = false
    findFirstAvailableTableAsync(
      [2, 3, 4, 0, 8, 10]
    ).then(value => {
      expect(value).toBe(3)
      called = true
    })
    // above code approve the code is not blocking
    expect(called).toBe(false)
  })

  it('should find empty table in async mode using await keyword', async () => {
    const index = await findFirstAvailableTableAsync(
      [2, 3, 4, 0, 8, 10]
    )
    // above code approve the code is not blocking
    expect(index).toBe(3)
  })

  it ('should reject -1 if no table is empty in async mode', () => {
    expect(
      findFirstAvailableTableAsync(
        [2, 3, 4, 8, 10]
      )
    ).rejects.toBe(-1)
  })
})

// find in a list of numbers the index of 0,
// which represent the numbers of customer occupied the table
function findFirstAvailableTable(list: number[]): number {
  return list.findIndex(table => table === 0)
}

// running async 
async function findFirstAvailableTableAsync(list: number[]): Promise<number> {
  return new Promise((resolve, reject) => {
    const result = list.findIndex(table => table === 0)

    if (result > -1) {
      return resolve(result)
    }
    return reject(-1)
  })
}

export {
  findFirstAvailableTable,
  findFirstAvailableTableAsync,
}
export function getUniqueObjects<T extends { _id: string }>(arr: T[]): T[] {
  const uniqueObjects: T[] = []
  const uniqueObjectIds = new Set<string>()

  for (const obj of arr) {
    const id = obj._id
    if (!uniqueObjectIds.has(id)) {
      uniqueObjects.push(obj)
      uniqueObjectIds.add(id)
    }
  }

  return uniqueObjects
}

export function findByKeys(arr: GSAPI.Game[], values: string[]) {
  return arr.filter((el) => {
    return values.some((f) => {
      if (el) {
        const compareTo = el.genres.map((item) => item.title)
        return compareTo.includes(f)
      }
    })
  })
}

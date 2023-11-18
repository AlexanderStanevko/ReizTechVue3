let UUID = 1

export const UniqueID = () => {
  const getID = () => {
    UUID += 1
    return UUID
  }

  return {
    getID,
  }
}

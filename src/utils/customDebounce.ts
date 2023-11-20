export const customDebounce = <F extends (...args: any[]) => void>(
  func: F,
  waitFor: number,
) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  return (...args: any[]) => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => func(...args), waitFor)
  }
}

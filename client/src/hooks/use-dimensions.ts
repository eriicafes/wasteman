import { useIsomorphicLayoutEffect } from "framer-motion"
import { RefObject, useState } from "react"

export type Dimensions = {
  width: number
  height: number
}

/**
 * Get element or window dimensions.
 * @param ref HTML Element Ref object
 */
export function useDimensions<T extends Element>(ref?: RefObject<T>) {
  const [dimensions, setDimensions] = useState<Dimensions>({ width: 0, height: 0 })

  useIsomorphicLayoutEffect(() => {
    const resize = () => {
      // if ref is provided use element dimensions else use window dimensions
      if (ref) {
        // only update dimensions if ref.current is available
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect()
          setDimensions({
            width: rect.width,
            height: rect.height,
          })
        }
      } else {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        })
      }
    }
    // execute resize function to set initial dimensions
    resize()

    // add and remove resize listener
    window.addEventListener("resize", resize)

    return () => window.removeEventListener("resize", resize)
  }, [ref])

  return dimensions
}

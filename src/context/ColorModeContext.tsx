import { createContext, useState, useContext } from "react"
import { useTheme } from "@mui/material/styles"

export type ColorMode = "light" | "dark"
const modeTable: Record<ColorMode, ColorMode> = {
  dark: "light",
  light: "dark"
}

const ColorModeContext = createContext({
  toggleColorMode: () => {}
})

export const ColorModeProvider = ColorModeContext.Provider

export function useColorModeState() {
  const [mode, setMode] = useState<ColorMode>(() => {
    const mode = localStorage.getItem(
      "theme.mode"
    ) as ColorMode
    if (mode) return mode

    localStorage.setItem("theme.mode", "dark")
    return localStorage.getItem("theme.mode") as ColorMode
  })

  const colorMode = {
    toggleColorMode: () => {
      const currentMode = localStorage.getItem(
        "theme.mode"
      ) as ColorMode

      localStorage.setItem(
        "theme.mode",
        modeTable[currentMode]
      )
      setMode(modeTable[currentMode])
    }
  }

  return {
    mode, // mode 提供给theme context
    colorMode // colorMode 提供给ColorModeProvider
  }
}

// 提供给子组件的hook 子组件可以通过这个hook拿到color mode
// 和改变color mode
export function useColorMode() {
  const theme = useTheme()
  const { toggleColorMode } = useContext(ColorModeContext)

  const mode = theme.palette.mode

  return {
    mode,
    toggleColorMode
  }
}

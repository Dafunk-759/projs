import { createContext, useState, useContext } from "react"
import useMediaQuery from "@mui/material/useMediaQuery"
import { useTheme } from "@mui/material/styles"

export type ColorMode = "light" | "dark"

const ColorModeContext = createContext({
  toggleColorMode: () => {}
})

export const ColorModeProvider = ColorModeContext.Provider

export function useColorModeState() {
  const prefersDarkMode = useMediaQuery(
    "(prefers-color-scheme: dark)"
  )
  const [mode, setMode] = useState<ColorMode>(
    prefersDarkMode ? "dark" : "light"
  )

  const colorMode = {
    toggleColorMode: () => {
      setMode(prevMode =>
        prevMode === "light" ? "dark" : "light"
      )
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

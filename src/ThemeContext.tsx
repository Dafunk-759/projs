import type { ReactElement } from "react"
import { createContext, useState, useContext } from "react"
import useMediaQuery from "@mui/material/useMediaQuery"
import {
  createTheme,
  ThemeProvider,
  useTheme
} from "@mui/material/styles"
import { zhCN, enUS } from "@mui/material/locale"

const locales = {
  zhCN,
  enUS
}

//colormode context
export type ColorMode = "light" | "dark"
const ColorModeContext = createContext({
  toggleColorMode: () => {}
})

//local context
export type SupportedLocales = keyof typeof locales

export type LocalContext = {
  setLocale: (lang: SupportedLocales) => void
  locale: SupportedLocales
  locales: typeof locales
}

export type LocalText<A = string> = {
  [key in SupportedLocales]: A
}

const localContext = createContext<LocalContext>({
  setLocale: (lang: SupportedLocales) => {}
} as LocalContext)

//palette context
type PaletteContext = {
  previewPalette: (
    primary: string,
    secondary: string
  ) => void
  submitPalette: (
    primary: string,
    secondary: string
  ) => void
}

const paletteContext = createContext<PaletteContext>({
  previewPalette: (
    primary: string,
    secondary: string
  ) => {},
  submitPalette: (primary: string, secondary: string) => {}
})

export type AppThemeProps = {
  children: ReactElement | ReactElement[]
}

export function AppTheme({ children }: AppThemeProps) {
  const prefersDarkMode = useMediaQuery(
    "(prefers-color-scheme: dark)"
  )
  const [mode, setMode] = useState<ColorMode>(
    prefersDarkMode ? "dark" : "light"
  )

  const [locale, setLocale] =
    useState<SupportedLocales>("zhCN")

  const [paletteState, setPaletteState] = useState({
    primary:
      localStorage.getItem("theme.palette.primary") ??
      "#1976d2",
    secondary:
      localStorage.getItem("theme.palette.secondary") ??
      "#9c27b0"
  })

  const colorMode = {
    toggleColorMode: () => {
      setMode(prevMode =>
        prevMode === "light" ? "dark" : "light"
      )
    }
  }

  const localLang = {
    setLocale,
    locale,
    locales
  }

  const palette: PaletteContext = {
    previewPalette: (primary, secondary) => {
      setPaletteState({
        primary,
        secondary
      })
    },
    submitPalette: (primary, secondary) => {
      localStorage.setItem("theme.palette.primary", primary)
      localStorage.setItem(
        "theme.palette.secondary",
        secondary
      )
      setPaletteState({
        primary,
        secondary
      })
    }
  }

  const theme = createTheme(
    {
      palette: {
        mode,
        primary: {
          main: paletteState.primary
        },
        secondary: {
          main: paletteState.secondary
        }
      }
    },
    locales[locale]
  )

  return (
    <paletteContext.Provider value={palette}>
      <localContext.Provider value={localLang}>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            {children}
          </ThemeProvider>
        </ColorModeContext.Provider>
      </localContext.Provider>
    </paletteContext.Provider>
  )
}

export function useDarkLightMode() {
  const theme = useTheme()
  const { toggleColorMode } = useContext(ColorModeContext)

  const mode = theme.palette.mode

  return {
    mode,
    toggleColorMode
  }
}

export function usePalette() {
  const theme = useTheme()
  const { previewPalette, submitPalette } = useContext(paletteContext)

  return {
    primary: theme.palette.primary.main,
    secondary: theme.palette.secondary.main,
    previewPalette,
    submitPalette
  }
}

export function useLocalLang() {
  return useContext(localContext)
}

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

const ColorModeContext = createContext({
  toggleColorMode: () => {}
})

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setLocale: (lang: SupportedLocales) => {}
} as LocalContext)

export type AppThemeProps = {
  children: ReactElement | ReactElement[]
}

export function AppTheme({ children }: AppThemeProps) {
  const prefersDarkMode = useMediaQuery(
    "(prefers-color-scheme: dark)"
  )
  const [mode, setMode] = useState<"light" | "dark">(
    prefersDarkMode ? "dark" : "light"
  )
  const [locale, setLocale] =
    useState<SupportedLocales>("zhCN")

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

  const theme = createTheme(
    {
      palette: {
        mode
      }
    },
    locales[locale]
  )

  return (
    <localContext.Provider value={localLang}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          {children}
        </ThemeProvider>
      </ColorModeContext.Provider>
    </localContext.Provider>
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

export function useLocalLang() {
  return useContext(localContext)
}

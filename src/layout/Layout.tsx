import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Button,
  Brightness4Icon,
  Brightness7Icon,
  Autocomplete,
  TextField,
  RouterLink,
  Container,
  Stack,
  Avatar
} from "../components"

import type {
  SupportedLocales,
  LocalText
} from "../ThemeContext"
import {
  useDarkLightMode,
  useLocalLang
} from "../ThemeContext"

import type { PropsWithChildren } from "../types"

import avatarImg from "./avatar.png"

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      <Container sx={{ mt: 2 }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
        >
          {children}
        </Stack>
      </Container>
    </>
  )
}

const headerText: LocalText = {
  zhCN: "主页",
  enUS: "Home"
}

function Header() {
  const { mode, toggleColorMode } = useDarkLightMode()
  const { setLocale, locale, locales } = useLocalLang()

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="default">
        <Toolbar>
          <Avatar sx={{ mr: 2 }} alt="Jq" src={avatarImg} />
          <Button
            variant="contained"
            color="inherit"
            component={RouterLink}
            to="/"
          >
            {headerText[locale]}
          </Button>
          <Autocomplete
            options={Object.keys(locales)}
            getOptionLabel={key =>
              `${key.substring(0, 2)}-${key.substring(
                2,
                4
              )}`
            }
            value={locale}
            sx={{ m: 2, ml: "auto", width: 150 }}
            disableClearable
            onChange={(_, newValue: string | null) => {
              setLocale(newValue as SupportedLocales)
            }}
            renderInput={params => (
              <TextField
                {...params}
                label="Locale"
                fullWidth
              />
            )}
          />
          <IconButton
            onClick={toggleColorMode}
            color="inherit"
          >
            {mode === "dark" ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

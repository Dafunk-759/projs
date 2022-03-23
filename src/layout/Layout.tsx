import {
  AppBar,
  Box,
  Toolbar,
  Tooltip,
  IconButton,
  Brightness4Icon,
  Brightness7Icon,
  Autocomplete,
  TextField,
  Container,
  Avatar,
  ColorLensIcon,
  HomeIcon,
  IconLink
} from "../components"

import type {
  SupportedLocales,
  ColorMode
} from "../context/ThemeContext"
import {
  useDarkLightMode,
  useLocalLang
} from "../context/ThemeContext"

import type { PropsWithChildren, OnClick } from "../types"

import avatarImg from "../static/avatar.png"

export default function Layout({
  children
}: PropsWithChildren) {
  return (
    <>
      <Header />
      <Container sx={{ mt: 2, mb: 2 }}>
        {children}
      </Container>
    </>
  )
}

function Header() {
  const { mode, toggleColorMode } = useDarkLightMode()
  const { setLocale, locale, locales } = useLocalLang()

  const localeInput = (
    <Autocomplete
      options={Object.keys(locales)}
      getOptionLabel={key =>
        `${key.substring(0, 2)}-${key.substring(2, 4)}`
      }
      value={locale}
      sx={{ m: 2, ml: "auto", maxWidth: 125 }}
      disableClearable
      onChange={(_, newValue: string | null) => {
        setLocale(newValue as SupportedLocales)
      }}
      renderInput={params => (
        <TextField {...params} label="Locale" />
      )}
    />
  )

  return (
    <HeaderContainer>
      <Avatar sx={{ mr: 2 }} alt="Jq" src={avatarImg} />

      <IconLink to="/" tooltip="go home">
        <HomeIcon />
      </IconLink>

      {localeInput}

      <IconLink to="/palette" tooltip="edit theme">
        <ColorLensIcon />
      </IconLink>

      <ColorModeIcon
        onClick={toggleColorMode}
        mode={mode}
      />
    </HeaderContainer>
  )
}

function HeaderContainer({ children }: PropsWithChildren) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        color="default"
        id="app-top-anchor"
      >
        <Toolbar>{children}</Toolbar>
      </AppBar>
    </Box>
  )
}

function ColorModeIcon({
  onClick,
  mode
}: {
  onClick: OnClick
  mode: ColorMode
}) {
  return (
    <Tooltip title="change color mode">
      <IconButton onClick={onClick} color="inherit">
        {mode === "dark" ? (
          <Brightness7Icon />
        ) : (
          <Brightness4Icon />
        )}
      </IconButton>
    </Tooltip>
  )
}

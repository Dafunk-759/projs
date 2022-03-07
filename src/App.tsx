import React from "react"
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
  Paper,
  RouterLink,
  Container,
  CssBaseline,
  Stack,
  Typography,
  CardContent,
  CardActions,
  Card
} from "./components"

import type { SupportedLocales, LocalText } from "./ThemeContext"
import { AppTheme, useDarkLightMode, useLocalLang } from "./ThemeContext"

import type { PropsWithChildren } from "./types"

export default function App() {
  return (
    <AppTheme>
      <CssBaseline />
      <Header />
      <Layout>
        <Detail />
        <Projs />
      </Layout>
    </AppTheme>
  )
}

function Layout({ children }: PropsWithChildren) {
  return (
    <Container sx={{ mt: 2 }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
      >
        {children}
      </Stack>
    </Container>
  )
}

const enDetail = {
  head: "h1111111111111",
  subtitle: "subtitleee",
  content: "some content",
  overline: "overline"
}

const detail: LocalText<typeof enDetail> = {
  enUS: enDetail,
  zhCN: enDetail
}

function Detail() {
  const { locale } = useLocalLang()

  return (
    <Paper>
      <Container>
        <Typography variant="h4" gutterBottom>
          {detail[locale].head}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          {detail[locale].subtitle}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {detail[locale].content}
        </Typography>
        <Typography variant="overline" gutterBottom>
          {detail[locale].overline}
        </Typography>
      </Container>
    </Paper>
  )
}

type Project = {
  name: string
  title: string
  date: string
  body: string
}

const projs: Project[] = [
  {
    name: "foo",
    title: "bar",
    date: "2022 3 7",
    body: "body"
  },
  {
    name: "foo",
    title: "bar",
    date: "2022 3 4",
    body: "body"
  }
]

function Projs() {
  const projCards = projs.map(proj => <ProjectCard {...proj} key={proj.date} />)

  return (
    <Paper>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
      >
        {projCards}
      </Stack>
    </Paper>
  )
}

const buttonText = {
  enUS: "Learn More",
  zhCN: "查看详情"
}

function ProjectCard({ name, title, date, body }: Project) {
  const { locale } = useLocalLang()

  return (
    <Card>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {name}
        </Typography>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {date}
        </Typography>
        <Typography variant="body2">{body}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small">{buttonText[locale]}</Button>
      </CardActions>
    </Card>
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
              `${key.substring(0, 2)}-${key.substring(2, 4)}`
            }
            value={locale}
            sx={{ m: 2, ml: "auto", width: 150 }}
            disableClearable
            onChange={(_, newValue: string | null) => {
              setLocale(newValue as SupportedLocales)
            }}
            renderInput={params => (
              <TextField {...params} label="Locale" fullWidth />
            )}
          />
          <IconButton onClick={toggleColorMode} color="inherit">
            {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

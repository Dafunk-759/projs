import { useState } from "react"
import {
  Paper,
  Container,
  Typography,
  Card,
  CardActions,
  CardContent,
  Button,
  Stack,
  RouterLink,
  Autocomplete,
  TextField
} from "../components"

import type { Project } from "./Projects"
import { projs, projectNames } from "./Projects"

import type { LocalText } from "../context/ThemeContext"
import { useLocalLang } from "../context/ThemeContext"

export function Home() {
  return (
    <>
      <Detail />
      <Projs />
    </>
  )
}

// details

const enDetail = {
  head: "This is a project collection.",
  subtitle: `
    in order to show some simple projects 
    and experiment some technology
  `,
  content: `This is used to show some small projects, 
    which are mainly used to practice techniques 
    and explore new techniques.`,
  overline: "powered by mui."
}

const zhDetail = {
  head: "这里是一些项目的集合",
  subtitle: "主要用来展示一些小项目和探索一些新的技术",
  content: `
    这里用来展示一些小的项目，
    这些项目主要是用来练习技术和探索新的技术。
  `,
  overline: "使用mui作为这些项目的基础。"
}

const detail: LocalText<typeof enDetail> = {
  enUS: enDetail,
  zhCN: zhDetail
}

function Detail() {
  const { locale } = useLocalLang()

  return (
    <Paper sx={{ alignSelf: "flex-start" }}>
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

// projects

function Projs() {
  const [value, setValue] = useState<string | null>(null)

  const projCards = projs
    .filter(p => (value === null ? true : p.name === value))
    .map(proj => <ProjectCard {...proj} key={proj.id} />)

  return (
    <Paper sx={{ padding: 1 }}>
      <Autocomplete
        disablePortal
        id="project-search-input"
        options={projectNames}
        sx={{ m: 2 }}
        renderInput={params => (
          <TextField {...params} label="project" />
        )}
        value={value}
        onChange={(e, newValue) => setValue(newValue)}
      />
      <Stack spacing={{ xs: 1, sm: 2, md: 4 }}>
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
        <Typography
          sx={{ fontSize: 14 }}
          color="text.secondary"
          gutterBottom
        >
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
        <Button
          size="small"
          variant="contained"
          color="inherit"
          component={RouterLink}
          to={"/project/" + name}
        >
          {buttonText[locale]}
        </Button>
      </CardActions>
    </Card>
  )
}

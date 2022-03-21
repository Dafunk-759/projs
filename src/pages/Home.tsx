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
  Grid,
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
    <Grid
      direction={{ xs: "column", sm: "row" }}
      container
      rowSpacing={1}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
    >
      <Grid item xs={4}>
        <Detail />
      </Grid>
      <Grid item xs={8}>
        <Projs />
      </Grid>
    </Grid>
  )
}

// details

const enDetail = {
  head: "Toy box",
  subtitle: `
    Here are some small items of daily practice collected.
  `,
  content: `
    The reason why it is called a toy box,
    Because here are some small projects of daily practice,
    Mostly no more than 200 lines of code, since there were always demos when learning the front end before,
    But after doing it, it is lost, and it is more troublesome to deploy a demo on the line alone.
    So I simply made this toy box to save the demo I usually do.
    This ensures the simplicity of the demo (just focusing on the demo itself,
    Instead of a series of issues such as joint deployment online, it must be considered)
    You can make these demos really useful.  
  `,
  overline: `
    powered by mui.
    depolyed by vercel.
  `
}

const zhDetail = {
  head: "玩具箱",
  subtitle: "这里收集了一些日常练习的小项目。",
  content: `
    之所以管这里叫做玩具箱，
    是因为这里都是一些日常练习的小项目，
    大多不超过200行代码，由于以前学习前端时总是做些demo，
    但是做完就丢，单独为一个demo部署上线又比较麻烦，
    所以我干脆做了这个玩具箱来保存平时做的demo。
    这样既可以保证demo的简洁(仅仅关注demo本身，
    而不是连带部署上线等一系列问题都要考虑)
    又可以让这些demo真正有用起来。
  `,
  overline: `
    powered by mui.
    depolyed by vercel.
  `
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

import { useState } from "react"

import {
  Paper,
  Typography,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CardHeader,
  Stack,
  Grid,
  Autocomplete,
  TextField,
  Fab,
  AddIcon,
  Box,
  KeyboardArrowUpIcon,
  Tooltip,
  SelectInput,
  IconLink,
  FindInPageIcon,
  GitHubIcon,
  Divider
} from "../components"

import type { Project } from "./Projects"
import {
  projs,
  projectNames,
  compareProjDate
} from "./Projects"

import type { LocalText } from "../context/ThemeContext"
import { useLocalLang } from "../context/ThemeContext"

import { useTransition } from "../hooks"

import detailImag from "../static/detail.png"

export function Home() {
  return (
    <>
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
      <Footer />
      <FabMenu />
    </>
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
    <Card>
      <CardHeader
        title={detail[locale].head}
        subheader={detail[locale].subtitle}
      />
      <CardMedia
        component="img"
        height="194"
        image={detailImag}
        alt="tool box"
      />
      <CardContent>
        <Typography variant="body1" gutterBottom>
          {detail[locale].content}
        </Typography>
        <Typography variant="overline" gutterBottom>
          {detail[locale].overline}
        </Typography>
      </CardContent>
    </Card>
  )
}

// projects

type SortType =
  | "date/asc"
  | "date/desc"
  | "dict/asc"
  | "dict/desc"

const sortOptions: { name: string; value: SortType }[] = [
  { name: "日期升序", value: "date/asc" },
  { name: "日期降序", value: "date/desc" },
  { name: "字典升序", value: "dict/asc" },
  { name: "字典降序", value: "dict/desc" }
]

type Compare = (a: Project, b: Project) => 0 | 1 | -1
const compares: Record<SortType, Compare> = {
  "date/asc": (a, b) => {
    return compareProjDate(a.date, b.date)
  },
  "date/desc": (a, b) => {
    return compareProjDate(b.date, a.date)
  },
  "dict/asc": (a, b) => {
    if (a.name > b.name) {
      return 1
    } else if (a.name < b.name) {
      return -1
    } else {
      return 0
    }
  },
  "dict/desc": (a, b) => {
    if (a.name > b.name) {
      return -1
    } else if (a.name < b.name) {
      return 1
    } else {
      return 0
    }
  }
}

function Projs() {
  const [value, setValue] = useState<string | null>(null)
  const [sortType, setSortType] =
    useState<SortType>("date/desc")

  const compare = compares[sortType]

  const projCards = projs
    .filter(p => (value === null ? true : p.name === value))
    .sort(compare)
    .map(proj => <ProjectCard {...proj} key={proj.id} />)

  const search = (
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
  )

  const control = (
    <Grid container>
      <Grid
        item
        xs={6}
        sx={{ display: "flex", alignItems: "center" }}
      >
        <SelectInput
          name="sort"
          label="排序"
          value={sortType}
          onChange={e =>
            setSortType(e.target.value as SortType)
          }
          options={sortOptions}
        />
      </Grid>
      <Grid item xs={6}>
        {search}
      </Grid>
    </Grid>
  )

  return (
    <Paper sx={{ padding: 1 }}>
      {control}
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
        <IconLink
          to={`/project/${name}`}
          tooltip={buttonText[locale]}
        >
          <FindInPageIcon />
        </IconLink>
      </CardActions>
    </Card>
  )
}

// menu
function FabMenu() {
  const { style, toggleShow } = useTransition({
    start: {
      opacity: 0,
      transform: "translateY(100%)"
    },
    end: {
      opacity: 1,
      transform: "none"
    },
    duration: 500,
    timingFunc: "ease"
  })

  const gotoTop = () => {
    document
      .querySelector("#app-top-anchor")
      ?.scrollIntoView({
        behavior: "smooth"
      })
  }

  return (
    <Box
      sx={{
        position: "fixed",
        right: "40px",
        bottom: "40px"
      }}
    >
      <Stack direction="column" sx={{ ...style }}>
        <Tooltip title="回到顶部" placement="left">
          <Fab
            color="primary"
            aria-label="goto top"
            onClick={gotoTop}
          >
            <KeyboardArrowUpIcon />
          </Fab>
        </Tooltip>
      </Stack>

      <Tooltip title="菜单" placement="left">
        <Fab
          color="primary"
          aria-label="add"
          sx={{ mt: 1 }}
          onClick={toggleShow}
        >
          <AddIcon />
        </Fab>
      </Tooltip>
    </Box>
  )
}

function Footer() {
  return (
    <>
      <Divider sx={{ mt: 5 }} />
      <Grid
        container
        spacing={2}
        alignItems="center"
        component="footer"
      >
        <Grid item>
          <Typography
            variant="overline"
            sx={{ lineHeight: 5 }}
          >
            Copyright © 2022 Dafunk.
          </Typography>
        </Grid>

        <Grid item sx={{ ml: "auto" }}>
          <a
            href="https://github.com/Dafunk-759"
            target="_blank"
          >
            <GitHubIcon />
          </a>
        </Grid>
      </Grid>
    </>
  )
}

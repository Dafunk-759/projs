import { useState, useReducer, useEffect } from "react"

import type { Style } from "../types"

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
  TextField,
  Fab,
  AddIcon,
  Box,
  KeyboardArrowUpIcon,
  Tooltip
} from "../components"

import type { Project } from "./Projects"
import { projs, projectNames } from "./Projects"

import type { LocalText } from "../context/ThemeContext"
import { useLocalLang } from "../context/ThemeContext"

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
    <Paper
      sx={{
        alignSelf: "flex-start"
      }}
    >
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

/**
 * `start` 为起始状态 对应元素隐藏
 * `end` 为终止状态 对应元素显示
 * `initShow` 为初始显示与否 默认false
 *
 * 显示时，状态从start到end
 * 隐藏式，状态从end到start
 *
 * 返回值:
 *  `style` 传给要应用过渡动画的mui组件的sx属性
 *  `toggleShow` 控制对应元素的显示
 */
function useTransition({
  start,
  end,
  duration,
  timingFunc,
  propName = "all",
  initShow = false,
  delay
}: {
  start: Style
  end: Style
  duration: number
  timingFunc: string
  propName?: string
  initShow?: boolean
  delay?: number
}) {
  const [show, setShow] = useState(initShow)
  const [style, setStyle] = useState<Style>(() => {
    const transition =
      `${propName} ${duration / 1000}s ${timingFunc}` +
      (delay ? ` ${delay}` : "")

    return initShow
      ? {
          ...end,
          transition
        }
      : {
          ...start,
          transition,
          display: "none"
        }
  })

  const open = () => {
    setShow(true)
    setStyle((s: Style) => exclude(s, "display"))
    setTimeout(() => {
      setStyle((s: Style) => ({
        ...exclude(s, Object.keys(start)),
        ...end
      }))
    }, 0)
  }

  const close = () => {
    setStyle((s: Style) => ({
      ...exclude(s, Object.keys(end)),
      ...start
    }))

    setTimeout(() => {
      setShow(false)
      setStyle((s: Style) => ({
        ...s,
        display: "none"
      }))
    }, duration)
  }

  return {
    style,
    toggleShow: show ? close : open
  }
}

function exclude<
  Obj extends Record<string, any>,
  Props extends string
>(obj: Obj, props: Props | Props[]): Exclude<Obj, Props> {
  const needRemove = (key: string) => {
    if (Array.isArray(props)) {
      return (props as string[]).includes(key)
    } else {
      return key === props
    }
  }

  const ret: Record<string, any> = {}
  Object.keys(obj).forEach(key => {
    if (!needRemove(key)) {
      ret[key] = obj[key]
    }
  })

  return ret as Exclude<Obj, Props>
}

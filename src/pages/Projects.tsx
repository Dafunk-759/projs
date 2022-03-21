import { lazy, Suspense } from "react"

import { useParams } from "react-router-dom"

import {
  Container,
  CircularProgress,
  Box
} from "../components"

import NotFound from "./404"

const Bin2Dec = lazy(
  () => import("../projects/Bin2Dec/Bin2Dec")
)
const Random = lazy(
  () => import("../projects/Random/Random")
)
const BorderRadius = lazy(
  () => import("../projects/BorderRadius/BorderRadius")
)

export type Project = {
  name: string
  title: string
  date: string
  body: string
  id: number
}

type ProjectItem = Omit<Project, "id"> & {
  Component: ReturnType<typeof lazy>
}

const projectTable: Record<string, ProjectItem> = {
  Bin2Dec: {
    name: "Bin2Dec",
    title: "Bin to Dec",
    date: "2022/3/8",
    body: `
      Binary is the number system all digital 
      computers are based on. Therefore it's 
      important for developers to understand binary, 
      or base 2, mathematics. The purpose of Bin2Dec 
      is to provide practice and understanding of how 
      binary calculations.
      Bin2Dec allows the user to enter strings of up 
      to 8 binary digits, 0's and 1's, in any sequence 
      and then displays its decimal equivalent.
    `,
    Component: Bin2Dec
  },
  Random: {
    name: "Random",
    title: "随机数生成器",
    date: "2022/3/18",
    body: `
      通过给定生成的数目，最小值和最大值。
      生成在此范围内的随机数。
    `,
    Component: Random
  },
  BorderRadius: {
    name: "BorderRadius",
    title: "border-radius 预览板",
    date: "2022/3/21",
    body: `
      可视化的改变border-radius的四个参数。
      并查看容器的变化。
      还可以导出css代码。
    `,
    Component: BorderRadius
  }
}

export const projs: Project[] = Object.values(
  projectTable
).map(({ name, title, date, body }, i) => ({
  name,
  title,
  date,
  body,
  id: i
}))

export const projectNames = projs.map(p => p.name)

export function Projects() {
  const { projectName } = useParams()

  if (projectName === undefined) {
    return <NotFound />
  }

  const item = projectTable[projectName]
  if (item === undefined) {
    return <NotFound />
  }

  const { Component } = item

  return (
    <Container>
      <Suspense fallback={<Fallback />}>
        <Component />
      </Suspense>
    </Container>
  )
}

function Fallback() {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        justifyContent: "center"
      }}
    >
      <CircularProgress />
    </Box>
  )
}

import type { ReactElement } from "react"
import { useParams } from "react-router-dom"

import { Container } from "../components"

import NotFound from "./404"

import Bin2Dec from "../projects/Bin2Dec/Bin2Dec"
import Random from "../projects/Random/Random"

export type Project = {
  name: string
  title: string
  date: string
  body: string
  id: number
}

type ProjectItem = Omit<Project, "id"> & {
  component: ReactElement
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
    component: <Bin2Dec />
  },
  Random: {
    name: "Random",
    title: "随机数生成器",
    date: "2022/3/18",
    body: `
      通过给定生成的数目，最小值和最大值。
      生成在此范围内的随机数。
    `,
    component: <Random />
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

  return <Container>{item.component}</Container>
}

import type { ReactElement } from "react"

type Obj = Record<string, unknown>

export type PropsWithChildren<A = Obj> = {
  children: ReactElement | ReactElement[]
} & A

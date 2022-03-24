import type {
  ReactElement,
  ChangeEventHandler,
  MouseEventHandler,
  HTMLAttributes
} from "react"

import { SxProps, Theme } from "@mui/material/styles"

type Obj = Record<string, unknown>

export type PropsWithChildren<A = Obj> = {
  children: ReactElement | ReactElement[]
} & A

export type OnChange = ChangeEventHandler<
  HTMLTextAreaElement | HTMLInputElement
>

export type OnClick = MouseEventHandler<HTMLButtonElement>

export type Style = Exclude<SxProps<Theme>, null>

export type DivProps = HTMLAttributes<HTMLDivElement>

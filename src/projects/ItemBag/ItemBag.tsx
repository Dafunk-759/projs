import { useState } from "react"

import {
  CenterStack,
  Typography,
  Box,
  Stack,
  FastfoodIcon,
  LocalDrinkIcon,
  CookieIcon
} from "../../components"
import type {
  PropsWithChildren,
  DivProps
} from "../../types"

type ItemId = 0 | 1 | 2
type Item = {
  id: ItemId
}

const itemsTable = [
  <FastfoodIcon />,
  <LocalDrinkIcon />,
  <CookieIcon />
]

const makeItems = (id: ItemId, elId: string) => {
  return <Draggable id={elId}>{itemsTable[id]}</Draggable>
}

export default function ItemBag() {
  const [row, setRow] = useState(5)
  const [col, setCol] = useState(5)

  const [items, setItems] = useState<Item[]>([
    { id: 0 },
    { id: 1 },
    { id: 2 },
    { id: 0 },
    { id: 1 },
    { id: 2 }
  ])

  return (
    <CenterStack
      alignItems="center"
      sx={{
        "& > :not(style)": {
          m: 2
        }
      }}
    >
      <Typography variant="h5">Item Bag</Typography>

      <Box>
        <Stack direction="row" spacing={2}>
          <Tag>
            <Typography>Store</Typography>
          </Tag>
        </Stack>
        <Bag row={1} col={itemsTable.length}>
          {makeItems(0, "store-item-0")}
          {makeItems(1, "store-item-1")}
          {makeItems(2, "store-item-2")}
        </Bag>
      </Box>

      <Box>
        <Stack direction="row" spacing={2}>
          <Tag>
            <Typography>Bag</Typography>
          </Tag>
          <Tag>
            <Typography>
              {`Total: ${items.length}`}
            </Typography>
          </Tag>
        </Stack>

        <Bag row={row} col={col}>
          {items.map(({ id }, i) => (
            <Box key={i}>
              {makeItems(id, `bag-item-${i}`)}
            </Box>
          ))}
        </Bag>
      </Box>
    </CenterStack>
  )
}

function Bag({
  row,
  col,
  children
}: PropsWithChildren<{
  row: number
  col: number
}>) {
  const items = Array.isArray(children)
    ? children
    : [children]
  const total = row * col

  return (
    <Box
      display="grid"
      gridTemplateColumns={`repeat(${col}, minmax(20px, 1fr))`}
      gridTemplateRows={`repeat(${row}, minmax(20px, 1fr))`}
      gap={2}
      sx={{
        bgcolor: "primary.light",
        p: 2
      }}
    >
      {Array.from({ length: total }, (_, i) => (
        <Box
          key={i}
          sx={{
            bgcolor: "secondary.light",
            p: 1
          }}
          className="dropzone"
        >
          {items[i]}
        </Box>
      ))}
    </Box>
  )
}

function Tag({ children }: PropsWithChildren) {
  return (
    <Box
      sx={{
        minWidth: 40,
        height: 30,
        bgcolor: "primary.light",
        mb: 1,
        display: "grid",
        placeContent: "center",
        p: 1
      }}
    >
      {children}
    </Box>
  )
}

function Draggable({
  children,
  ...props
}: PropsWithChildren & DivProps) {
  return (
    <div {...props} draggable>
      {children}
    </div>
  )
}

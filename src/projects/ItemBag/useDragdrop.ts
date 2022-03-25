import type { DependencyList } from "react"
import { useEffect } from "react"

export type Target = EventTarget | null

export type DragEvents =
  | "drag"
  | "dragstart"
  | "dragend"
  | "dragover"
  | "dragenter"
  | "dragleave"
  | "drop"

export const makeDraglogger = (
  enable: DragEvents[] | "enableAll" | "disableAll"
) => {
  return function (
    event: DragEvents,
    target: Target,
    cb?: (target: Target) => void
  ) {
    if (enable === "disableAll") {
      return
    } else if (enable === "enableAll") {
      console.log(event, target)
      cb?.(target)
    } else if (Array.isArray(enable)) {
      if (enable.includes(event)) {
        console.log(event, target)
        cb?.(target)
      }
    }
  }
}

export type DragEventHandler = (event: DragEvent) => void
export type DragdropProps = {
  [K in DragEvents]?: DragEventHandler
}

export function useDragdrop(
  {
    drag,
    dragstart,
    dragend,
    dragover,
    dragenter,
    dragleave,
    drop
  }: DragdropProps,
  deps: DependencyList
) {
  const onDrag: DragEventHandler = e => {
    drag?.(e)
  }

  const onDragstart: DragEventHandler = e => {
    dragstart?.(e)
  }

  const onDragend: DragEventHandler = e => {
    dragend?.(e)
  }

  const onDragover: DragEventHandler = e => {
    // 阻止默认动作以启用drop
    e.preventDefault()
    dragover?.(e)
  }

  const onDragenter: DragEventHandler = e => {
    dragenter?.(e)
  }

  const onDragleave: DragEventHandler = e => {
    dragleave?.(e)
  }

  const onDrop: DragEventHandler = e => {
    // 阻止默认动作（如打开一些元素的链接）
    e.preventDefault()
    drop?.(e)
  }

  useEffect(() => {
    /* 拖动目标元素时触发drag事件 */
    document.addEventListener("drag", onDrag, false)

    document.addEventListener(
      "dragstart",
      onDragstart,
      false
    )

    document.addEventListener("dragend", onDragend, false)

    /* 放置目标元素时触发事件 */
    document.addEventListener("dragover", onDragover, false)

    document.addEventListener(
      "dragenter",
      onDragenter,
      false
    )

    document.addEventListener(
      "dragleave",
      onDragleave,
      false
    )

    document.addEventListener("drop", onDrop, false)

    return () => {
      document.removeEventListener("drag", onDrag)
      document.removeEventListener("dragstart", onDragstart)
      document.removeEventListener("dragend", onDragend)
      document.removeEventListener("dragover", onDragover)
      document.removeEventListener("dragenter", onDragenter)
      document.removeEventListener("dragleave", onDragleave)
      document.removeEventListener("drop", onDrop)
    }
  }, deps)
}

import { useState } from "react"

import type { Style } from "./types"

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
export function useTransition({
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

export function useCopy(successTime: number = 2000) {
  const [copySuccess, setCopyState] = useState(false)

  const copyText = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(_ => {
        // copy 成功后2s内显示成功
        // 2s 后恢复初始状态
        setCopyState(true)

        setTimeout(() => {
          setCopyState(false)
        }, successTime)
      })
      .catch(_ => setCopyState(false))
  }

  return {
    copySuccess,
    copyText
  }
}

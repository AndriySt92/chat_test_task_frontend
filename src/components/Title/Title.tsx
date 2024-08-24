import React from "react"
import classNames from "classnames"
import styles from "./Title.module.css"

interface Props {
  children: React.ReactNode
  style?: React.CSSProperties
  size?: "small" | "large"
}

const Title = ({ style, children, size = "small" }: Props) => {
  const allClasses = classNames(styles.title, {
    [styles["title--small"]]: size === "small",
    [styles["title--large"]]: size === "large",
  })

  return (
    <h2 className={allClasses} style={style}>
      {children}
    </h2>
  )
}

export default Title

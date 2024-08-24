import classNames from "classnames"
import styles from "./Error.module.css"

interface Props {
  text: string
  style?: React.CSSProperties
  size?: "small" | "large"
}

const Error = ({ style, text, size = "small" }: Props) => {
  const allClasses = classNames(styles.error, {
    [styles["error--small"]]: size === "small",
    [styles["error--large"]]: size === "large",
  })

  return (
    <div className={allClasses} style={style}>
      {text}
    </div>
  )
}

export default Error

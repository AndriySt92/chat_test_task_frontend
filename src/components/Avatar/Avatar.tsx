import type React from "react"
import styles from "./Avatar.module.css"

interface Props {
  src: string
  name: string
  alt?: string
  size?: "large" | "small"
  style?: React.CSSProperties
}

const Avatar = ({ src, style, alt, name}: Props) => {
  return <img className={styles.avatar} src={src || `https://ui-avatars.com/api/?name=${name}`} style={style} alt={alt || "Avatar"} />
}

export default Avatar
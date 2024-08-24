import type React from "react"
import classNames from "classnames"
import styles from "./Button.module.css"
import { Link } from "react-router-dom"

interface Props {
  children: React.ReactNode
  type?: "submit" | "reset" | "button"
  onClick?: () => void
  disabled?: boolean
  style?: React.CSSProperties;
}

const Button = ({ children, style, disabled, onClick, type }: Props) => {
  return (
    <button
      className={styles.button}
      style={style}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  )
}

export default Button

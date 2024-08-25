import classNames from "classnames"
import styles from "./LabeledInput.module.css"
import type { UseFormRegister, RegisterOptions } from "react-hook-form"
import { Error } from "../../components"

interface Props {
  name: string
  label?: string
  type?: string
  placeholder?: string
  error?: string
  register: UseFormRegister<any>
  validation?: RegisterOptions
  inputStyle?: React.CSSProperties,
  labelStyle?: React.CSSProperties
  wrapperStyle?: React.CSSProperties
}

const LabeledInput = ({
  name,
  placeholder,
  label = "",
  type = "text",
  error = "",
  register,
  validation,
  inputStyle,
  labelStyle,
  wrapperStyle,
}: Props) => {
  const inputAllClasses = classNames(styles.input, error && styles.error)

  return (
    <div className={styles.wrapper} style={wrapperStyle}>
      <label htmlFor={name} className={styles.label} style={labelStyle}>
        {label}
      </label>
      <input
        id={name}
        style={inputStyle}
        type={type}
        placeholder={placeholder}
        className={inputAllClasses}
        {...register(name, validation)}
      />
      {error && <Error text={error} />}
    </div>
  )
}

export default LabeledInput

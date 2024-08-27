import { useForm } from "react-hook-form"
import styles from "./Login.module.css"
import type { ILoginData } from "../../interfaces/userInterfaces"
import type { IApiError } from "../../interfaces/errorIntreface"
import {
  LoadingButton,
  LabeledInput,
  Title,
  Button,
  Error,
} from "../../components"
import { Link } from "react-router-dom"
import { useLoginMutation } from "../../redux/authApi"
import { toast } from "react-toastify"

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ILoginData>({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  })
  const [login, { isLoading, error }] = useLoginMutation()

  const onSubmit = handleSubmit(async data => {
    try {
      await login(data).unwrap()
    } catch (error: unknown) {
      debugger
      if (error) {
        const message =
          (error as IApiError)?.data?.message || "Something went wrong"
        toast.error(message)
      } else {
        toast.error("An unexpected error occurred")
      }
    }
  })

  return (
    <div className={styles.login}>
      <Title>Login</Title>
      <form className={styles.form} onSubmit={onSubmit}>
        <LabeledInput
          name="email"
          placeholder="Enter your email"
          label="Email"
          type="email"
          error={errors?.email?.message as string}
          register={register}
          validation={{
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Invalid email address",
            },
          }}
        />

        <LabeledInput
          name="password"
          placeholder="Enter your password"
          label="Password"
          type="text"
          error={errors?.password?.message as string}
          register={register}
          validation={{
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 symbols",
            },
          }}
        />

        {error && (
          <Error
            text={(error as IApiError).data?.message as string}
            style={{ marginBottom: "20px" }}
          />
        )}

        <Link to="/register" className={styles.loginLink}>
          {"Don't"} have an account?
        </Link>

        {!isLoading ? (
          <Button disabled={isLoading} style={{ width: "100%" }} type="submit">
            Sign in
          </Button>
        ) : (
          <LoadingButton style={{ width: "100%" }}>Loading...</LoadingButton>
        )}
      </form>
    </div>
  )
}

export default Login

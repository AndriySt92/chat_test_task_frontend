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
import { useAppDispatch } from "../../hooks/reduxHooks"
import { Link } from "react-router-dom"
import { useLoginMutation } from "../../redux/authApi"
import { setUser } from "../../redux/authSlice"

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
  const dispatch = useAppDispatch()

  const onSubmit = handleSubmit(async data => {
    try {
      const { lastName, firstName, email } = await login(data).unwrap()
      dispatch(setUser({ lastName, firstName, email }))
    } catch (error) {
      console.log("Something went wrong")
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

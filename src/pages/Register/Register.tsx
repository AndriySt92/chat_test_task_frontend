import { useForm } from "react-hook-form"
import styles from "./Register.module.css"
import type { IRegisterData } from "../../interfaces/userInterfaces"
import type { IApiError } from "../../interfaces/errorIntreface"
import {
  LoadingButton,
  LabeledInput,
  Title,
  Button,
  Error,
} from "../../components"
import { Link } from "react-router-dom"
import { useRegisterMutation } from "../../redux/authApi"

const Register = () => {
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<IRegisterData>({
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })
  const [registerMutation, { isLoading, error }] = useRegisterMutation()

  const onSubmit = handleSubmit(async data => {
    try {
      await registerMutation(data).unwrap()
    } catch (error) {
      console.log(error)
    }
  })

  return (
    <div className={styles.register}>
      <Title>Register</Title>
      <form className={styles.form} onSubmit={onSubmit}>
        <LabeledInput
          name="firstName"
          placeholder="Enter your First Name"
          label="First Name"
          type="text"
          error={errors?.firstName?.message as string}
          register={register}
          validation={{
            required: "First Name is required",
            minLength: {
              value: 2,
              message: "First Name must be at least 2 characters",
            },
            maxLength: {
              value: 70,
              message: "First Name cannot exceed 70 characters.",
            },
          }}
        />

        <LabeledInput
          name="lastName"
          placeholder="Enter your Last Name"
          label="Last Name"
          type="text"
          error={errors?.lastName?.message as string}
          register={register}
          validation={{
            required: "Last Name is required",
            minLength: {
              value: 2,
              message: "Last Name must be at least 2 characters",
            },
            maxLength: {
              value: 70,
              message: "Last Name cannot exceed 70 characters.",
            },
          }}
        />

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

        <LabeledInput
          name="confirmPassword"
          placeholder="Confirm password"
          label="Confirm password"
          type="text"
          error={errors?.confirmPassword?.message as string}
          register={register}
          validation={{
            required: "Confirm password is required",
            validate: (val: string) => {
              if (watch("password") !== val) {
                return "Your passwords do no match"
              }
            },
          }}
        />

        {error && (
          <Error
            text={(error as IApiError).data?.message as string}
            style={{ marginBottom: "20px" }}
          />
        )}

        <Link to="/login" className={styles.registerLink}>
          Do have an account?
        </Link>

        {!isLoading ? (
          <Button disabled={isLoading} style={{ width: "100%" }} type="submit">
            Sign up
          </Button>
        ) : (
          <LoadingButton style={{ width: "100%" }}>Loading...</LoadingButton>
        )}
      </form>
    </div>
  )
}

export default Register

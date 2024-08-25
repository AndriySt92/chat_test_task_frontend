import { useForm } from "react-hook-form"
import styles from "./ChatBotForm.module.css"
import type { IApiError } from "../../interfaces/errorIntreface"
import { LoadingButton, LabeledInput, Button } from "../../components"
import type { IChatDataForm } from "../../interfaces/chatInterfaces"
import { useAddChatMutation, useUpdateChatMutation } from "../../redux/chatApi"
import { toast } from "react-toastify"

interface Props {
  chatId?: string
  mode: "create" | "update"
  closeModal: () => void
}

const ChatBotForm = ({ chatId, mode, closeModal }: Props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IChatDataForm>({
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  })
  const [addChat, { isLoading }] = useAddChatMutation()
  const [updateChat, { isLoading: isUpdating, error: updatingError }] =
    useUpdateChatMutation()

  const onSubmit = handleSubmit(async data => {
    try {
      if (mode === "update" && chatId) {
        const updateChatData = {
          chatId: chatId,
          firstName: data.firstName,
          lastName: data.lastName,
        }
        await updateChat(updateChatData).unwrap()
      }

      if (mode === "create") {
        await addChat(data).unwrap()
      }

      closeModal()
    } catch (error: unknown) {
      if (error instanceof Error) {
        const message =
          (error as IApiError)?.data?.message || "Something went wrong"
        toast.error(message)
      } else {
        toast.error("An unexpected error occurred")
      }
    }
  })

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <LabeledInput
        name="firstName"
        placeholder="Enter chat bot First Name"
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
        placeholder="Enter chat bot Last Name"
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
      {!isLoading || isUpdating ? (
        <Button
          disabled={isLoading || isUpdating}
          style={{ width: "100%" }}
          type="submit"
        >
          {`${mode === "update" ? "Update Bot" : "Create bot"}`}
        </Button>
      ) : (
        <LoadingButton style={{ width: "100%" }}>Loading...</LoadingButton>
      )}
    </form>
  )
}

export default ChatBotForm

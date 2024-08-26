import styles from "./MessageForm.module.css"
import Button from "../Button/Button"
import LabeledInput from "../LabeledInput/LabeledInput"
import { useForm } from "react-hook-form"
import { useAddMessageMutation, useUpdateMessageMutation } from "../../redux/chatApi"
import { IApiError } from "../../interfaces/errorIntreface"
import { toast } from "react-toastify"
import { IoSend } from "react-icons/io5"
import { IMessage } from "../../interfaces/chatInterfaces"

interface Props {
  message?: IMessage
  chatId: string
  mode: "create" | "update"
  handleUpdate?: () => void
}

const MessageForm = ({ message, mode, chatId, handleUpdate }: Props) => {
  const [addMessage, { isLoading: isSending }] = useAddMessageMutation()
  const [updateMessage, { isLoading: isUpdating }] = useUpdateMessageMutation()

  const { register, handleSubmit, reset } = useForm<{ messageText: string }>({
    mode: "onChange",
    defaultValues: {
      messageText: "",
    },
  })

  const onSubmit = handleSubmit(async ({ messageText }) => {
    try {
      if (mode === "create") {
        await addMessage({ chatId, messageText }).unwrap()
      }

      if (mode === "update" && handleUpdate && message) {
        await updateMessage({ messageId: message._id, messageText }).unwrap()
        handleUpdate()
      }

      reset()
      toast.success(`${mode} message successfully`)
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
        name="messageText"
        inputStyle={{ width: "100%" }}
        wrapperStyle={{ marginBottom: "0px", width: "100%" }}
        labelStyle={{ display: "none" }}
        placeholder="Text your message"
        type="text"
        register={register}
      />

      <Button
        disabled={isSending || isUpdating}
        style={{
          borderRadius: "50%",
          padding: "10px",
          marginLeft: "10px",
        }}
        type="submit"
      >
        <IoSend style={{ fontSize: "20px" }} />
      </Button>
    </form>
  )
}

export default MessageForm

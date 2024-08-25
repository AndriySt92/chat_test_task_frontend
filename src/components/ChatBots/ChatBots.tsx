import { Button, Error, Modal, Title } from "../../components"
import { useRemoveChatMutation } from "../../redux/chatApi"
import ChatBotsItem from "../ChatBotsItem/ChatBotsItem"
import styles from "./ChatBots.module.css"
import { toast } from "react-toastify"
import type { IApiError } from "../../interfaces/errorIntreface"
import { useEffect, useState } from "react"
import ChatBotForm from "../ChatBotForm/ChatBotForm"
import type { IChat } from "../../interfaces/chatInterfaces"

interface Props {
  handleClick: (chatId: string) => void
  selectedChatId: string
  data: IChat[]
}

const ChatBots = ({ data, handleClick, selectedChatId }: Props) => {
  const [updatingChatId, setUpdatingChatId] = useState("")
  const [isUpdateChatModalOpen, setUpdateChatModalOpen] = useState(false)

  const [deletingChatId, setDeletingChatId] = useState("")
  const [isDeleteChatModalOpen, setDeleteChatModalOpen] = useState(false)
  const [isDeleteChat, setIsDeleteChat] = useState(false)
  const [removeChat, { isLoading: isDeleting }] = useRemoveChatMutation()

  useEffect(() => {
    if (isDeleteChat) {
      const handleDelete = async () => {
        if (isDeleting) return

        try {
          await removeChat(deletingChatId).unwrap()
          setDeletingChatId("")
          setDeleteChatModalOpen(false)
          setIsDeleteChat(false)
          toast("Deleted successfully")
        } catch (error: unknown) {
          if (error instanceof Error) {
            const message =
              (error as IApiError)?.data?.message || "Something went wrong"
            toast.error(message)
          } else {
            toast.error("An unexpected error occurred")
          }
          setDeletingChatId("")
          setDeleteChatModalOpen(false)
          setIsDeleteChat(false)
        }
      }
      handleDelete()
    }
  }, [isDeleteChat])

  const openUpdateChatModal = (
    event: React.MouseEvent<SVGElement>,
    chatId: string,
  ) => {
    event.stopPropagation()
    setUpdatingChatId(chatId)
    setUpdateChatModalOpen(true)
  }

  const closeUpdateChatModal = () => {
    setUpdateChatModalOpen(false)
    setUpdatingChatId("")
  }

  const openDeleteChatModal = (
    event: React.MouseEvent<SVGElement>,
    chatId: string,
  ) => {
    event.stopPropagation()
    setDeletingChatId(chatId)
    setDeleteChatModalOpen(true)
  }

  const closeDeleteChatModal = () => {
    setDeleteChatModalOpen(false)
    setDeletingChatId("")
  }

  return (
    <div className={styles.chatBots}>
      <ul className={styles.chatBotsList}>
        {data && data.length !== 0 ? (
          data.map(bot => (
            <ChatBotsItem
              key={bot._id}
              chatId={bot._id}
              avatar={bot.avatar || ""}
              lastMessage={bot.lastMessage || "There are no messages"}
              lastName={bot.bot_lastName}
              firstName={bot.bot_firstName}
              userId={bot.user_creator}
              selectedChatId={selectedChatId}
              handleUpdate={openUpdateChatModal}
              handleDelete={openDeleteChatModal}
              handleClick={handleClick}
            />
          ))
        ) : (
          <Title
            size="small"
            style={{ padding: "10px 20px", textAlign: "center" }}
          >
            You haven't created any chat bots!
          </Title>
        )}
      </ul>

      <Modal isOpen={isUpdateChatModalOpen} onClose={closeUpdateChatModal}>
        <Title>Update chat bot</Title>
        <ChatBotForm
          chatId={updatingChatId}
          mode="update"
          closeModal={closeUpdateChatModal}
        />
      </Modal>

      <Modal isOpen={isDeleteChatModalOpen} onClose={closeDeleteChatModal}>
        <Title>Delete chat bot?</Title>
        <div style={{display: "flex", gap: "10px"}}>
          <Button onClick={closeDeleteChatModal}>Cancel</Button>
          <Button onClick={() => setIsDeleteChat(true)}>Delete</Button>
        </div>
      </Modal>
    </div>
  )
}

export default ChatBots

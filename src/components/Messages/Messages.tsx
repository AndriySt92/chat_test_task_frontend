import type { IChat, IMessage } from "../../interfaces/chatInterfaces"
import {
  ProfileInfo,
  Title,
  MessagesItem,
  Modal,
  MessageForm,
} from "../../components"
import styles from "./Messages.module.css"
import { useAppSelector } from "../../hooks/hooks"
import { useState, useEffect, useRef } from "react"

interface Props {
  selectedChat: IChat
  messages: IMessage[]
}

const Messages = ({ selectedChat, messages }: Props) => {
  const [updatingMessage, setUpdatingMessage] = useState({})
  const [isUpdateMessageModalOpen, setUpdateMessageModalOpen] = useState(false)
  const user = useAppSelector(state => state.user.user)
  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  const openUpdateMessageModal = (message: IMessage) => {
    setUpdatingMessage(message)
    setUpdateMessageModalOpen(true)
  }

  const closeUpdateMessageModal = () => {
    setUpdatingMessage("")
    setUpdateMessageModalOpen(false)
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <div className={styles.messages}>
      <div className={styles.messagesTop}>
        {selectedChat._id && (
          <ProfileInfo
            firstName={selectedChat.bot_firstName || ""}
            lastName={selectedChat.bot_lastName || ""}
            avatar={selectedChat.avatar || ""}
          />
        )}
      </div>
      <div className={styles.messagesListWrapper}>
        {messages && messages.length !== 0 && (
          <ul className={styles.messagesList}>
            {user &&
              messages.map(({ _id, authorId, message, updatedAt }) => (
                <MessagesItem
                  key={_id}
                  messageId={_id}
                  chatId={selectedChat._id}
                  userId={user._id}
                  authorId={authorId}
                  message={message}
                  updatedAt={updatedAt}
                  handleClick={openUpdateMessageModal}
                />
              ))}
          </ul>
        )}
        {messages && messages.length === 0 && (
          <Title
            style={{ textAlign: "center" }}
          >{`You haven't any messages with ${selectedChat.bot_firstName} ${selectedChat.bot_lastName}`}</Title>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className={styles.messagesForm}>
        <MessageForm chatId={selectedChat._id} mode="create" />
      </div>
      {isUpdateMessageModalOpen && (
        <div className={styles.messagesForm}>
          <Modal
            isOpen={isUpdateMessageModalOpen}
            onClose={closeUpdateMessageModal}
          >
            <Title>Update message</Title>
            <MessageForm
              chatId={selectedChat._id}
              message={updatingMessage as IMessage}
              mode="update"
              handleUpdate={closeUpdateMessageModal}
            />
          </Modal>
        </div>
      )}
    </div>
  )
}

export default Messages

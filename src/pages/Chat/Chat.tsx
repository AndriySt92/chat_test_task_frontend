import { useEffect, useState } from "react"
import styles from "./Chat.module.css"
import { Messages, Sidebar, Title } from "../../components"
import type { IChat, IMessage } from "../../interfaces/chatInterfaces"
import { useGetChatMessagesQuery } from "../../redux/chatApi"
import type { Socket } from "socket.io-client"
import { io } from "socket.io-client"
import { toast } from "react-toastify"
import { useAppSelector } from "../../hooks/hooks"

const Chat = () => {
  const [selectedChat, setSelectedChat] = useState<IChat>({} as IChat)
  const [messages, setMessages] = useState<IMessage[]>([])
  const { data } = useGetChatMessagesQuery(selectedChat._id)
  const user = useAppSelector(state => state.user.user)

  useEffect(() => {
    if (data) {
      setMessages(data)
    }
  }, [data])

  useEffect(() => {
    let socket: Socket | undefined
    if (user?._id) {
      socket = io("http://localhost:5000")

      socket.on("newMessage", (newMessage: IMessage) => {
        setMessages(prevMessages => [...prevMessages, newMessage])

        if (user?._id !== newMessage.authorId)
          toast.success(`New messages for you ${user?.firstName}`)
      })
    }

    return () => {
      socket?.close()
    }
  }, [user?._id])

  const handleClickChat = (chat: IChat) => {
    setSelectedChat(chat)
  }

  return (
    <div className={styles.chat}>
      <div className={styles.chatContainer}>
        <Sidebar
          selectedChat={selectedChat as IChat}
          handleClickChat={handleClickChat}
        />
        {messages.length ? (
          <Messages selectedChat={selectedChat} messages={messages} />
        ) : (
          <div style={{ flex: "2" }}>
            <Title style={{ textAlign: "center", paddingTop: "10px" }}>
              Select a chatbot
            </Title>
          </div>
        )}
      </div>
    </div>
  )
}

export default Chat

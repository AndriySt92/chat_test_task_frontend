import { useState } from "react"
import styles from "./Chat.module.css"
import { Messages, Sidebar, Title } from "../../components"
import { IChat } from "../../interfaces/chatInterfaces"

const Chat = () => {
  const [selectedChat, setSelectedChat] = useState<IChat>({} as IChat)

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
        {selectedChat._id ? (
          <Messages selectedChat={selectedChat} />
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

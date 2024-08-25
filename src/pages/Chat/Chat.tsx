import { useState } from "react"
import styles from "./Chat.module.css"
import { Messages, Sidebar } from "../../components"

const Chat = () => {
  const [selectedChatId, setSelectedChatId] = useState<string>("")

  const handleClickChat = (chatId: string) => {
    setSelectedChatId(chatId)
  }

  return (
    <div className={styles.chat}>
      <div className={styles.chatContainer}>
        <Sidebar
          selectedChatId={selectedChatId}
          handleClickChat={handleClickChat}
        />
        <Messages selectedChatId={selectedChatId} />
      </div>
    </div>
  )
}

export default Chat

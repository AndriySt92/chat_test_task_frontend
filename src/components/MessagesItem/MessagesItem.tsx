import styles from "./MessagesItem.module.css"
import classNames from "classnames"
import { formatDate } from "../../utils/formatDate"
import type { IMessage } from "../../interfaces/chatInterfaces"

interface Props {
  messageId: string
  chatId: string
  authorId: string
  userId: string
  message: string
  updatedAt: Date
  handleClick: (chat: IMessage) => void
}

const MessagesItem = ({
  messageId,
  chatId,
  authorId,
  userId,
  message,
  updatedAt,
  handleClick
}: Props) => {
  const alignmentClass = classNames({
    [styles.messageRight]: authorId === userId,
    [styles.messageLeft]: chatId === authorId,
  })

  const handleClickMessage = () => {
    if(authorId === userId) {
      handleClick({message, authorId, _id: messageId, updatedAt})
    }
  }

  return (
    <div className={`${styles.messagesItem} ${alignmentClass}`} onClick={handleClickMessage}>
      <p className={`${styles.text} ${alignmentClass}`}>{message}</p>
      <p className={`${styles.date}`}>{formatDate(updatedAt)}</p>
    </div>
  )
}

export default MessagesItem

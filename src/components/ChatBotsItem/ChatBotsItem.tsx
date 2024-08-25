import classNames from "classnames"
import { ProfileInfo } from "../../components"
import styles from "./ChatBotsItem.module.css"
import { MdSystemUpdateAlt } from "react-icons/md"
import { RiDeleteBin6Line } from "react-icons/ri"
interface Props {
  chatId: string
  firstName: string
  lastName: string
  lastMessage: string
  avatar: string
  userId: string
  handleDelete: (event: React.MouseEvent<SVGElement>, chatId: string) => void
  handleClick: (chatId: string) => void
  selectedChatId: string
  handleUpdate: (event: React.MouseEvent<SVGElement>, chatId: string) => void
}

const ChatBotsItem = ({
  chatId,
  firstName,
  lastName,
  lastMessage,
  avatar,
  handleDelete,
  handleClick,
  selectedChatId,
  handleUpdate,
}: Props) => {
  const liClasses = classNames(styles.chatItem, {
    [styles.active]: selectedChatId === chatId,
  })

  return (
    <li className={liClasses} onClick={() => handleClick(chatId)}>
      <div className={styles.chatItemInner}>
        <div className={styles.chatInfo}>
          <ProfileInfo
            firstName={firstName}
            lastName={lastName}
            avatar={avatar}
            message={lastMessage}
            style={{ marginBottom: "0px" }}
          />
        </div>
        <div className={styles.chatButtons}>
          <RiDeleteBin6Line
            style={{ fontSize: "22px" }}
            onClick={event => handleDelete(event, chatId)}
          />
          <MdSystemUpdateAlt
            style={{ fontSize: "22px" }}
            onClick={(event) => handleUpdate(event, chatId)}
          />
        </div>
      </div>
    </li>
  )
}

export default ChatBotsItem

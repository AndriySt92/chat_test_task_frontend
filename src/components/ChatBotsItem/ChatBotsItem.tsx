import classNames from "classnames"
import { ProfileInfo } from "../../components"
import styles from "./ChatBotsItem.module.css"
import { MdSystemUpdateAlt } from "react-icons/md"
import { RiDeleteBin6Line } from "react-icons/ri"
import { IChat } from "../../interfaces/chatInterfaces"
interface Props {
  chatId: string
  firstName: string
  lastName: string
  lastMessage: string
  avatar: string
  userId: string
  handleDelete: (event: React.MouseEvent<SVGElement>, chatId: string) => void
  handleClick: (chat: IChat) => void
  selectedChat: IChat
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
  selectedChat,
  handleUpdate,
}: Props) => {
  const liClasses = classNames(styles.chatItem, {
    [styles.active]: selectedChat._id === chatId,
  })

  return (
    <li className={liClasses} onClick={() => handleClick({_id: chatId, bot_firstName: firstName, bot_lastName: lastName, avatar } as IChat)}>
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

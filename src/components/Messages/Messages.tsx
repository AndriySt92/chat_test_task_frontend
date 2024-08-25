import styles from "./Messages.module.css"

interface Props {
  selectedChatId: string
}

const Messages = ({selectedChatId}: Props) => {
  return <div className={styles.messages}>{selectedChatId}</div>
}

export default Messages

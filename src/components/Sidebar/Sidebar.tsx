import { useState } from "react"
import styles from "./Sidebar.module.css"
import { ChatBots, Error, Loader, SidebarTop } from "../../components"
import { useGetChatsQuery } from "../../redux/chatApi"

interface Props {
  selectedChatId: string
  handleClickChat: (chatId: string) => void
}

const Sidebar = ({ selectedChatId, handleClickChat }: Props) => {
  const [chatBots, setChatBots] = useState()
  const [searchTerm, setSearchTerm] = useState<string>("")
  const { data, isLoading, isError } = useGetChatsQuery({ search: searchTerm })

  const handleSearch = (value: string) => {
    setSearchTerm(value)
  }

  return (
    <div className={styles.sidebar}>
      <SidebarTop handleSearch={handleSearch} />
      {data && <ChatBots data={data} handleClick={handleClickChat} selectedChatId={selectedChatId} />}
      {isLoading && <Loader />}
      {isError && <Error text="Error fetching Chat Bots" />}
    </div>
  )
}

export default Sidebar

import { useState } from "react"
import styles from "./Sidebar.module.css"
import { ChatBots, Error, Loader, SidebarTop } from "../../components"
import { useGetChatsQuery } from "../../redux/chatApi"
import type { IChat } from "../../interfaces/chatInterfaces"

interface Props {
  selectedChat: IChat
  handleClickChat: (chat: IChat) => void
}

const Sidebar = ({ selectedChat, handleClickChat }: Props) => {
  const [searchTerm, setSearchTerm] = useState<string>("")
  const { data, isLoading, isError } = useGetChatsQuery({ search: searchTerm })

  const handleSearch = (value: string) => {
    setSearchTerm(value)
  }

  return (
    <div className={styles.sidebar}>
      <SidebarTop handleSearch={handleSearch} />
      {data && <ChatBots chats={data} handleClick={handleClickChat} selectedChat={selectedChat} />}
      {isLoading && <Loader />}
      {isError && <Error text="Error fetching Chat Bots" />}
    </div>
  )
}

export default Sidebar

import styles from "./SidebarTop.module.css"
import { Button, Modal, ProfileInfo, Search, Title } from "../../components"
import { BiLogOut } from "react-icons/bi"
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks"
import { logout } from "../../redux/authSlice"
import ChatBotForm from "../ChatBotForm/ChatBotForm"
import { useState } from "react"

interface Props {
  handleSearch: (value: string) => void
}

const SidebarTop = ({handleSearch}: Props) => {
  const [isCreateChatModalOpen, setCreateChatModalOpen] = useState(false)
  const user = useAppSelector(state => state.user.user)
  const dispatch = useAppDispatch()

  const openCreateChatModal = () => setCreateChatModalOpen(true)
  const closeCreateChatModal = () => setCreateChatModalOpen(false)

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div className={styles.sidebarTop}>
      <div className={styles.profile}>
        <ProfileInfo
          firstName={user?.firstName || ""}
          lastName={user?.lastName || ''}
          avatar={user?.avatar || ""}
          style={{marginBottom: '0px'}}
        />
        <BiLogOut style={{ fontSize: "25px", cursor: 'pointer' }}  onClick={handleLogout} />
      </div>
      <Search handleSearch={handleSearch} />
      <Button onClick={openCreateChatModal}>Create bot</Button>

      <Modal isOpen={isCreateChatModalOpen} onClose={closeCreateChatModal}>
        <Title>Create chat bot</Title>
        <ChatBotForm mode="create" closeModal={closeCreateChatModal} />
      </Modal>
    </div>
  )
}

export default SidebarTop

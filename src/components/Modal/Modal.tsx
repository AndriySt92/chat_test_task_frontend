import type React from "react"
import styles from "./Modal.module.css"

export interface Props {
  isOpen: boolean
  onClose: () => void
  children?: React.ReactNode
}

const Modal = ({ isOpen, onClose, children }: Props) => {
  if (!isOpen) return null

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  )
}

export default Modal

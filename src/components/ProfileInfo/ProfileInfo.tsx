import { Avatar } from "../../components"
import styles from "./ProfileInfo.module.css"
interface Props {
  firstName: string
  lastName: string
  avatar: string
  message?: string
  style?: React.CSSProperties
}

const ProfileInfo = ({
  style,
  firstName,
  lastName,
  avatar,
  message,
}: Props) => {
  return (
    <div className={styles.profileInfo} style={style}>
      <Avatar name={`${firstName}+${lastName}`} src={avatar} />
      <div>
        <span className={styles.name}>{`${firstName} ${lastName}`}</span>
        {message && <span className={styles.message}>{message}</span>}
      </div>
    </div>
  )
}

export default ProfileInfo

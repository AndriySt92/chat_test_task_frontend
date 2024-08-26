import { formatDistanceToNow } from "date-fns"

export const formatDate = (date: Date) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true })
}
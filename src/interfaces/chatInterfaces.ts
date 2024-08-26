export interface IChat {
    _id: string
    bot_firstName: string
    bot_lastName: string
    user_creator: string
    messages?: IMessage[]
    lastMessage: IMessage
    avatar: string | null
}

export interface IMessage {
    _id: string
    authorId: string
    message: string
    updatedAt: Date
}

export interface IChatDataForm {
    firstName: string
    lastName: string
}
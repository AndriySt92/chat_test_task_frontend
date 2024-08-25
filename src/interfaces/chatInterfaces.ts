export interface IChat {
    _id: string
    bot_firstName: string
    bot_lastName: string
    user_creator: string
    messages?: IMessage[]
    lastMessage: string | null
    avatar: string | null
}

export interface IMessage {
    _id: string
    authorId: string
    messageText: string
}

export interface IMessageRequestData extends Omit<IMessage, '_id'> {}

export interface IChatDataForm {
    firstName: string
    lastName: string
}
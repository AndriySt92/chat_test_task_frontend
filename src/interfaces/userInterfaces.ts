export interface IUser {
    firstName: string
    lastName: string
    email: string
}

export interface ILoginData {
    email: string
    password: string
}

export interface IRegisterData extends ILoginData {
    confirmPassword: string
    firstName: string
    lastName: string
} 
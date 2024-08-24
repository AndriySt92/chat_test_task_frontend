export const getToken = (): string => {
    let token

    if (localStorage.getItem('token')) {
      token = localStorage.getItem('token')
      return `${token}`
    } else {
      token = ''
      return token
    }
  }
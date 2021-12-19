import authApi from '../api/authApi'

export const isAuthenticated = async () => {
    const token = localStorage.getItem('token')
    if (!token) return false
    try {
        await authApi.checkToken()
        return true
    } catch(err) {
        return false
    }
}

export const logout = (navigate) => {
    localStorage.removeItem('token')
    navigate('/login')
}
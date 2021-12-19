import axiosClient from "./axiosClient"

const authApi = {
    login: (params) => axiosClient.post(
        'admin/login',
        params
    ),
    checkToken: () => axiosClient.post('admin/check-token')
}

export default authApi
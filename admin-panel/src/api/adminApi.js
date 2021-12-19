import axiosClient from "./axiosClient"

const adminApi = {
    getSummary: () => axiosClient.get('/admin/summary')
}

export default adminApi
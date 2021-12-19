import axiosClient from './axiosClient'

const vaccineEndpoint = 'vaccine'

const vaccineApi = {
    getAll: () => axiosClient.get(vaccineEndpoint),
    create: (params) => axiosClient.post(vaccineEndpoint, params),
    getOne: (id) => axiosClient.get(`${vaccineEndpoint}/${id}`),
    update: (id, params) => axiosClient.put(`${vaccineEndpoint}/${id}`, params),
    delete: (id) => axiosClient.delete(`${vaccineEndpoint}/${id}`)
}

export default vaccineApi
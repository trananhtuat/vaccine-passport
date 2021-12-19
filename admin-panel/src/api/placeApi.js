import axiosClient from './axiosClient'

const placeEndpoint = 'place'

const placeApi = {
    getAll: () => axiosClient.get(placeEndpoint),
    getOne: (id) => axiosClient.get(`${placeEndpoint}/${id}`)
}

export default placeApi
import axios from "axios"

export const isAdmin = async () => {
    const res = await axios.get('/api/getRole')
    const data = res.data.data.payload.role
    return data == 7
}

export const getData = async () => {
    const res = await axios.get('/api/getRole')
    const data = res.data.data.payload
    return data
}
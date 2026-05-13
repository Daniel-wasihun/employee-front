import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'https://employee-back-wwa3.onrender.com/api/v1'

export const metadataApi = {
  getRoles: () => axios.get(`${API_URL}/metadata/roles`)
}

import axios from 'axios'

const API_URL = 'http://localhost:3001/api'

export const getUserProfile = (userId, token) => {
  return axios.get(`${API_URL}/users/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
}

export const createRoutine = (userId, routineData, token) => {
  return axios.post(`${API_URL}/routines/users/${userId}`, routineData, {
    headers: { Authorization: `Bearer ${token}` },
  })
}

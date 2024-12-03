import axios from 'axios'

const API_URL = 'http://localhost:3001/api'

export const deleteUser = async (token, userData) => {
  try {
    const response = await axios.delete(`${API_URL}/admin/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: userData,
    })
    console.log(response.data.message)
    return response.data
  } catch (error) {
    console.error('Error eliminando usuario:', error.response.data.message)
    throw error
  }
}

export const updateUser = async (token, userData) => {
  try {
    const response = await axios.put(`${API_URL}/admin/users`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    console.log('Usuario actualizado:', response.data)
    return response.data
  } catch (error) {
    console.error('Error actualizando usuario:', error.response.data.message)
    throw error
  }
}

export const createUser = async (token, userData) => {
  try {
    const response = await axios.post(`${API_URL}/admin/users`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    console.log('Usuario creado:', response.data)
    return response.data
  } catch (error) {
    console.error('Error creando usuario:', error.response.data.message)
    throw error
  }
}

// api/dietApi.js
import axios from 'axios'

const API_URL = 'http://localhost:3001/api'

export const getAllDiets = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/diets`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return response.data
  } catch (error) {
    console.error('Error fetching diets:', error)
    throw error
  }
}

export const getUserDiets = async (userId, token) => {
  try {
    const response = await axios.get(`${API_URL}/diets/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return response.data
  } catch (error) {
    console.error('Error fetching user diets:', error)
    throw error
  }
}

export const createDiet = async (token, dietData) => {
  try {
    const response = await axios.post(`${API_URL}/diets`, dietData, {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    })
    return response.data
  } catch (error) {
    console.error('Error creating diet:', error)
    throw error
  }
}

export const updateDiet = async (dietId, token, dietData) => {
  try {
    const response = await axios.put(`${API_URL}/diets/${dietId}`, dietData, {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    })
    return response.data
  } catch (error) {
    console.error('Error updating diet:', error)
    throw error
  }
}

export const deleteDiet = async (dietId, token) => {
  try {
    const response = await axios.delete(`${API_URL}/diets/${dietId}`, {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    })
    return response.data
  } catch (error) {
    console.error('Error deleting diet:', error)
    throw error
  }
}

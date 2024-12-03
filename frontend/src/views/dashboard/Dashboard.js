import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  CFormCheck,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react'
import { CChartBar } from '@coreui/react-chartjs'

const Dashboard = () => {
  const [userId, setUserId] = useState(localStorage.getItem('userId'))
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [totalUsers, setTotalUsers] = useState(0)
  const [userDetails, setUserDetails] = useState({ exercisesCount: 0, dietsCount: 0, user: '' })
  const [exercises, setExercises] = useState([])
  const [selectedExercises, setSelectedExercises] = useState([])
  const [dietData, setDietData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        console.warn('Token is missing.')
      } else {
        console.log('Token found:', token)
      }

      if (!userId) {
        console.error('User ID is missing.')
        return
      } else {
        console.log('User ID found:', userId)
      }

      try {
        // Fetch total users
        const usersResponse = await axios.get('http://localhost:3001/api/total-users', {
          headers: { Authorization: `Bearer ${token}` },
        })
        setTotalUsers(usersResponse.data.totalUsers)

        // Fetch user details
        const userDetailsResponse = await axios.get(
          `http://localhost:3001/api/user-details/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        )
        setUserDetails(userDetailsResponse.data)

        // Fetch exercises
        const exerciseResponse = await axios.get(`http://localhost:3001/api/routines/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        console.log('Exercises fetched successfully:', exerciseResponse.data)
        setExercises(exerciseResponse.data || [])

        // Fetch diet data
        const dietResponse = await axios.get(`http://localhost:3001/api/diets/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        console.log('Diet data fetched successfully:', dietResponse.data)
        setDietData(dietResponse.data || [])
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [token, userId])

  const handleCheckboxChange = (exerciseId) => {
    setSelectedExercises((prevSelected) => {
      if (prevSelected.includes(exerciseId)) {
        return prevSelected.filter((id) => id !== exerciseId)
      } else {
        return [...prevSelected, exerciseId]
      }
    })
  }

  const userChartData = {
    labels: ['Cantidad de Usuarios', 'Ejercicios', 'Alimentos'],
    datasets: [
      {
        label: 'Cantidad',
        backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
        data: [totalUsers, userDetails.exercisesCount, userDetails.dietsCount],
      },
    ],
  }

  if (!userId) {
    return <div>User ID is missing. Please log in again.</div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Reporte Final</h1>

      <h2 className="text-xl font-semibold mt-4">Cantidad de Usuarios, Ejercicios y Alimentos</h2>
      <CChartBar data={userChartData} />

      <h2 className="text-xl font-semibold mt-4">Detalles del Usuario</h2>
      <CTable hover striped>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>Usuario</CTableHeaderCell>
            <CTableHeaderCell>Cantidad de Ejercicios</CTableHeaderCell>
            <CTableHeaderCell>Cantidad de Alimentos</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          <CTableRow>
            <CTableDataCell>{userDetails.user}</CTableDataCell>
            <CTableDataCell>{userDetails.exercisesCount}</CTableDataCell>
            <CTableDataCell>{userDetails.dietsCount}</CTableDataCell>
          </CTableRow>
        </CTableBody>
      </CTable>

      <h2 className="text-xl font-semibold mt-4">Rutina / Ejercicios</h2>
      <CTable hover striped>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>Seleccionar</CTableHeaderCell>
            <CTableHeaderCell>Ejercicio</CTableHeaderCell>
            <CTableHeaderCell>Descripción</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {Array.isArray(exercises) && exercises.length > 0 ? (
            exercises.map((exercise) => (
              <CTableRow key={exercise._id}>
                <CTableDataCell>
                  <CFormCheck
                    id={exercise._id}
                    label=""
                    checked={selectedExercises.includes(exercise._id)}
                    onChange={() => handleCheckboxChange(exercise._id)}
                  />
                </CTableDataCell>
                <CTableDataCell>{exercise.exerciseName}</CTableDataCell>
                <CTableDataCell>{exercise.description}</CTableDataCell>
              </CTableRow>
            ))
          ) : (
            <CTableRow>
              <CTableDataCell colSpan="3">No hay ejercicios disponibles.</CTableDataCell>
            </CTableRow>
          )}
        </CTableBody>
      </CTable>

      <h2 className="text-xl font-semibold mt-4">Dieta / Nutrición</h2>
      <CTable hover striped>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>Nombre del Alimento</CTableHeaderCell>
            <CTableHeaderCell>Descripción</CTableHeaderCell>
            <CTableHeaderCell>Calorías</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {Array.isArray(dietData) && dietData.length > 0 ? (
            dietData.map((diet) => (
              <CTableRow key={diet._id}>
                <CTableDataCell>{diet.foodName}</CTableDataCell>
                <CTableDataCell>{diet.description}</CTableDataCell>
                <CTableDataCell>{diet.calories}</CTableDataCell>
              </CTableRow>
            ))
          ) : (
            <CTableRow>
              <CTableDataCell colSpan="3">No hay datos de dieta disponibles.</CTableDataCell>
            </CTableRow>
          )}
        </CTableBody>
      </CTable>
    </div>
  )
}

export default Dashboard

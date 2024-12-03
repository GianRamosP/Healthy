import React, { useEffect, useState } from 'react'
import { getUserDiets } from '../../api/dietApi'
import {
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
} from '@coreui/react'

const Diets = () => {
  const [diets, setDiets] = useState([])
  const token = localStorage.getItem('token')
  const userId = localStorage.getItem('userId') // Asegúrate de que estás almacenando el userId en el localStorage cuando el usuario se logea

  useEffect(() => {
    const fetchDiets = async () => {
      if (!userId) {
        console.error('User ID is missing')
        return
      }

      try {
        const response = await getUserDiets(userId, token)
        setDiets(response)
      } catch (error) {
        console.error('Error fetching diets:', error)
      }
    }

    fetchDiets()
  }, [userId, token])

  return (
    <div>
      <h1>Gestión de Dietas</h1>
      <h2>Lista de Dietas</h2>
      <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>#</CTableHeaderCell>
            <CTableHeaderCell>Nombre del Alimento</CTableHeaderCell>
            <CTableHeaderCell>Calorías</CTableHeaderCell>
            <CTableHeaderCell>Descripción</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {diets.map((diet, index) => (
            <CTableRow key={diet._id}>
              <CTableHeaderCell>{index + 1}</CTableHeaderCell>
              <CTableDataCell>{diet.foodName}</CTableDataCell>
              <CTableDataCell>{diet.calories}</CTableDataCell>
              <CTableDataCell>{diet.description}</CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </div>
  )
}

export default Diets

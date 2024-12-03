import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { getUserDiets, createDiet, updateDiet, deleteDiet } from '../../api/dietApi'
import {
  CButton,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CForm,
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
} from '@coreui/react'

const AssignDietForm = ({ user, token, onClose }) => {
  const [diets, setDiets] = useState([])
  const [newDiet, setNewDiet] = useState({
    foodName: '',
    calories: '',
    description: '',
    user: user._id,
  })
  const [editMode, setEditMode] = useState(false)
  const [currentDietId, setCurrentDietId] = useState(null)

  useEffect(() => {
    const fetchDiets = async () => {
      try {
        const response = await getUserDiets(user._id, token)
        setDiets(response || [])
      } catch (error) {
        console.error('Error fetching diets:', error)
      }
    }
    fetchDiets()
  }, [user._id, token])

  const handleChange = (e) => {
    setNewDiet({ ...newDiet, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editMode) {
        // Update existing diet
        const response = await updateDiet(currentDietId, token, newDiet)
        setDiets(diets.map((diet) => (diet._id === currentDietId ? response : diet)))
      } else {
        // Add new diet
        const response = await createDiet(token, newDiet)
        setDiets([...diets, response])
      }
      setNewDiet({ foodName: '', calories: '', description: '', user: user._id })
      setEditMode(false)
      setCurrentDietId(null)
    } catch (error) {
      console.error('Error adding/updating diet:', error)
    }
  }

  const handleEdit = (diet) => {
    setNewDiet({
      foodName: diet.foodName,
      calories: diet.calories,
      description: diet.description,
      user: user._id,
    })
    setEditMode(true)
    setCurrentDietId(diet._id)
  }

  const handleDelete = async (id) => {
    try {
      await deleteDiet(id, token)
      setDiets(diets.filter((diet) => diet._id !== id))
    } catch (error) {
      console.error('Error deleting diet:', error)
    }
  }

  return (
    <div>
      <h3>Asignar Dieta a {user.name}</h3>
      <CForm className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-4">
          <CFormLabel htmlFor="foodName" className="visually-hidden">
            Nombre del Alimento
          </CFormLabel>
          <CFormInput
            type="text"
            id="foodName"
            name="foodName"
            placeholder="Nombre del Alimento"
            value={newDiet.foodName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-4">
          <CFormLabel htmlFor="calories" className="visually-hidden">
            Calorías
          </CFormLabel>
          <CFormInput
            type="number"
            id="calories"
            name="calories"
            placeholder="Calorías"
            value={newDiet.calories}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-4">
          <CFormLabel htmlFor="description" className="visually-hidden">
            Descripción
          </CFormLabel>
          <CFormTextarea
            name="description"
            id="description"
            placeholder="Descripción"
            value={newDiet.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-auto">
          <CButton type="submit" color="primary" className="mb-3">
            {editMode ? 'Actualizar Dieta' : 'Asignar Dieta'}
          </CButton>
          <CButton type="button" color="secondary" onClick={onClose} className="mb-3">
            Cancelar
          </CButton>
        </div>
      </CForm>
      <h2>Dietas Asignadas</h2>
      <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>#</CTableHeaderCell>
            <CTableHeaderCell>Nombre del Alimento</CTableHeaderCell>
            <CTableHeaderCell>Calorías</CTableHeaderCell>
            <CTableHeaderCell>Descripción</CTableHeaderCell>
            <CTableHeaderCell>Acciones</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {Array.isArray(diets) &&
            diets.map((diet, index) => (
              <CTableRow key={diet._id}>
                <CTableHeaderCell>{index + 1}</CTableHeaderCell>
                <CTableDataCell>{diet.foodName}</CTableDataCell>
                <CTableDataCell>{diet.calories}</CTableDataCell>
                <CTableDataCell>{diet.description}</CTableDataCell>
                <CTableDataCell>
                  <CButton onClick={() => handleEdit(diet)} color="warning" className="me-2">
                    Editar
                  </CButton>
                  <CButton onClick={() => handleDelete(diet._id)} color="danger">
                    Eliminar
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
        </CTableBody>
      </CTable>
    </div>
  )
}

export default AssignDietForm

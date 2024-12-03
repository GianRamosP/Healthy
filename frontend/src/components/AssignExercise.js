import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { CButton, CFormInput, CFormLabel, CFormTextarea, CForm } from '@coreui/react'

const AssignExercise = ({ userId, token }) => {
  const [exercises, setExercises] = useState([])
  const [newExercise, setNewExercise] = useState({
    exerciseName: '',
    description: '',
    videoLink: '',
  })
  const [editMode, setEditMode] = useState(false)
  const [currentExerciseId, setCurrentExerciseId] = useState(null)

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/routines/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        setExercises(response.data || [])
      } catch (error) {
        console.error('Error fetching exercises:', error)
      }
    }
    fetchExercises()
  }, [userId, token])

  const handleChange = (e) => {
    setNewExercise({ ...newExercise, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editMode) {
        // Update existing exercise
        const response = await axios.put(
          `http://localhost:3001/api/routines/${currentExerciseId}`,
          { ...newExercise },
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        )
        setExercises(
          exercises.map((exercise) =>
            exercise._id === currentExerciseId ? response.data : exercise,
          ),
        )
      } else {
        // Add new exercise
        const response = await axios.post(
          'http://localhost:3001/api/routines',
          { ...newExercise, user: userId },
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        )
        setExercises([...exercises, response.data])
      }
      setNewExercise({ exerciseName: '', description: '', videoLink: '' }) // Resetear videoLink
      setEditMode(false)
      setCurrentExerciseId(null)
    } catch (error) {
      console.error('Error adding/updating exercise:', error)
    }
  }

  const handleEdit = (exercise) => {
    setNewExercise({
      exerciseName: exercise.exerciseName,
      description: exercise.description,
      videoLink: exercise.videoLink,
    }) // Añadir videoLink al editar
    setEditMode(true)
    setCurrentExerciseId(exercise._id)
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/routines/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setExercises(exercises.filter((exercise) => exercise._id !== id))
    } catch (error) {
      console.error('Error deleting exercise:', error)
    }
  }

  return (
    <div>
      <h2>Asignar ejercicios</h2>
      <CForm className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-4">
          <CFormLabel htmlFor="exerciseName" className="visually-hidden">
            Nombre de ejercicio
          </CFormLabel>
          <CFormInput
            type="text"
            id="exerciseName"
            name="exerciseName"
            placeholder="Nombre de ejercicio"
            value={newExercise.exerciseName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-4">
          <CFormLabel htmlFor="exerciseDescription" className="visually-hidden">
            Descripción (ej., tiempo, repeticiones)
          </CFormLabel>
          <CFormTextarea
            name="description"
            id="exerciseDescription"
            placeholder="Descripción (ej., tiempo, repeticiones)"
            value={newExercise.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-4">
          <CFormLabel htmlFor="videoLink" className="visually-hidden">
            Enlace de video (YouTube)
          </CFormLabel>
          <CFormInput
            type="text"
            id="videoLink"
            name="videoLink"
            placeholder="Enlace de video (YouTube)"
            value={newExercise.videoLink}
            onChange={handleChange}
          />
        </div>
        <div className="col-auto">
          <CButton type="submit" color="primary" className="mb-3">
            {editMode ? 'Actualizar ejercicio' : 'Añadir ejercicio'}
          </CButton>
        </div>
      </CForm>
      <ul>
        {Array.isArray(exercises) &&
          exercises.map((exercise) => (
            <li key={exercise._id}>
              <h3>{exercise.exerciseName}</h3>
              <p>{exercise.description}</p>

              <CButton onClick={() => handleEdit(exercise)} color="warning" className="me-2">
                Editar
              </CButton>
              <CButton onClick={() => handleDelete(exercise._id)} color="danger">
                Eliminar
              </CButton>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default AssignExercise

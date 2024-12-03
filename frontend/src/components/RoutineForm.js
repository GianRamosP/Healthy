import React, { useState } from 'react'
import { createRoutine } from '../api/routinesApi'

const RoutineForm = ({ userId, token }) => {
  const [name, setName] = useState('')
  const [exercises, setExercises] = useState([''])

  const handleAddExercise = () => {
    setExercises([...exercises, ''])
  }

  const handleExerciseChange = (index, value) => {
    const newExercises = exercises.slice()
    newExercises[index] = value
    setExercises(newExercises)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await createRoutine(userId, { name, exercises }, token)
      alert('Rutina creada exitosamente')
    } catch (error) {
      console.error('Error creando rutina:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nombre de la rutina"
        required
      />
      {exercises.map((exercise, index) => (
        <input
          key={index}
          type="text"
          value={exercise}
          onChange={(e) => handleExerciseChange(index, e.target.value)}
          placeholder="Ejercicio (e.g., 'Estiramiento 15 minutos')"
          required
        />
      ))}
      <button type="button" onClick={handleAddExercise}>
        Agregar ejercicio
      </button>
      <button type="submit">Guardar rutina</button>
    </form>
  )
}

export default RoutineForm

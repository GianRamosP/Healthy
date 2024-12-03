import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { CFormCheck, CButton } from '@coreui/react'

const Exercises = () => {
  const [exercises, setExercises] = useState([])
  const [selectedExercises, setSelectedExercises] = useState([])
  const [videoUrl, setVideoUrl] = useState(null)
  const token = localStorage.getItem('token')
  const userId = localStorage.getItem('userId')

  useEffect(() => {
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

    console.log(`Fetching exercises for user ID: ${userId}`)

    const fetchExercises = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/routines/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        console.log('Exercises fetched successfully:', response.data)
        setExercises(response.data || [])
      } catch (error) {
        console.error('Error fetching exercises:', error)
      }
    }

    fetchExercises()
  }, [userId, token])

  const handleCheckboxChange = (exerciseId) => {
    setSelectedExercises((prevSelected) => {
      if (prevSelected.includes(exerciseId)) {
        return prevSelected.filter((id) => id !== exerciseId)
      } else {
        return [...prevSelected, exerciseId]
      }
    })
  }

  const getEmbeddableLink = (videoLink) => {
    if (!videoLink) return null
    const videoId = videoLink.split('v=')[1] || videoLink.split('/').pop()
    return `https://www.youtube.com/embed/${videoId}`
  }

  const handleVideoButtonClick = (videoLink) => {
    const embeddableLink = getEmbeddableLink(videoLink)
    setVideoUrl(embeddableLink)
  }

  if (!userId) {
    return <div>User ID is missing. Please log in again.</div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Rutina / ejercicios</h1>

      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {Array.isArray(exercises) && exercises.length > 0 ? (
          exercises.map((exercise) => (
            <li
              key={exercise._id}
              className="border-b border-gray-300 py-2 flex items-center justify-between"
            >
              <div className="flex items-center">
                <CFormCheck
                  id={exercise._id}
                  label={exercise.exerciseName}
                  checked={selectedExercises.includes(exercise._id)}
                  onChange={() => handleCheckboxChange(exercise._id)}
                />
                <p className="ml-4">{exercise.description}</p>
              </div>
              {exercise.videoLink && (
                <CButton
                  color="info"
                  className="ml-4"
                  onClick={() => handleVideoButtonClick(exercise.videoLink)}
                >
                  Ver Demostración
                </CButton>
              )}
            </li>
          ))
        ) : (
          <p>No hay ejercicios disponibles.</p>
        )}
      </ul>

      {videoUrl && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative w-full max-w-2xl">
            <iframe
              width="100%"
              height="400"
              src={videoUrl}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <CButton className="absolute top-2 right-2" onClick={() => setVideoUrl(null)}>
              Cerrar
            </CButton>
          </div>
        </div>
      )}
    </div>
  )
}

export default Exercises

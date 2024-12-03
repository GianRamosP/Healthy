import React, { useState } from 'react'
import AssignExercise from './AssignExercise'
import { CButton } from '@coreui/react'

const UserProfile = ({ user, token }) => {
  const [showAssignExercise, setShowAssignExercise] = useState(false)

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>Perfil de {user.name}</h1>
      <div className="mb-3">
        <CButton
          color={showAssignExercise ? 'danger' : 'primary'}
          onClick={() => setShowAssignExercise(!showAssignExercise)}
        >
          {showAssignExercise ? 'Cerrar perfil' : 'Abrir perfil'}
        </CButton>
      </div>
      {showAssignExercise && <AssignExercise userId={user._id} token={token} />}
    </div>
  )
}

export default UserProfile

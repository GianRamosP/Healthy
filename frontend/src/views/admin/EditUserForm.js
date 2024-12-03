import { CButton, CForm, CFormInput, CFormLabel } from '@coreui/react'
import React, { useState } from 'react'

const UserEditForm = ({ user, onSave, onCancel }) => {
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({ ...user, name, email })
  }

  return (
    <CForm onSubmit={handleSubmit}>
      <h3>Editar Usuario</h3>
      <div className="mb-3">
        <CFormLabel htmlFor="userName">Nombre:</CFormLabel>
        <CFormInput
          type="text"
          id="userName"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <CFormLabel htmlFor="userEmail">Email:</CFormLabel>
        <CFormInput
          type="email"
          id="userEmail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <CButton type="submit" color="primary" className="me-2">
          Guardar
        </CButton>
        <CButton type="button" color="secondary" onClick={onCancel}>
          Cancelar
        </CButton>
      </div>
    </CForm>
  )
}

export default UserEditForm

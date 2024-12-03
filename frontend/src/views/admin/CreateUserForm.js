import React, { useState } from 'react'
import { createUser } from '../../api/userApi'
import { CForm, CFormFloating, CFormInput, CFormLabel, CButton } from '@coreui/react'

const CreateUserForm = ({ token, fetchUsers }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
  })
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    try {
      await createUser(token, formData)
      fetchUsers()
      setFormData({ name: '', email: '', password: '', role: 'user' })
    } catch (error) {
      setError(error.response?.data?.message || 'Error creando usuario')
    }
  }

  return (
    <CForm onSubmit={handleSubmit}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <CFormFloating className="mb-3">
        <CFormInput
          type="text"
          name="name"
          id="floatingName"
          placeholder="Nombre"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <CFormLabel htmlFor="floatingName">Nombre</CFormLabel>
      </CFormFloating>
      <CFormFloating className="mb-3">
        <CFormInput
          type="email"
          name="email"
          id="floatingEmail"
          placeholder="name@example.com"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <CFormLabel htmlFor="floatingEmail">Email</CFormLabel>
      </CFormFloating>
      <CFormFloating className="mb-3">
        <CFormInput
          type="password"
          name="password"
          id="floatingPassword"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <CFormLabel htmlFor="floatingPassword">Contraseña</CFormLabel>
      </CFormFloating>
      <CFormFloating className="mb-3">
        <select name="role" value={formData.role} onChange={handleChange} className="form-select">
          <option value="user">Usuario</option>
          <option value="admin">Administrador</option>
        </select>
        <CFormLabel htmlFor="floatingRole">Rol</CFormLabel>
      </CFormFloating>
      <CButton type="submit" color="primary">
        Añadir
      </CButton>
    </CForm>
  )
}

export default CreateUserForm

import React, { useEffect, useState, useCallback } from 'react'
import axios from 'axios'
import CreateUserForm from './CreateUserForm'
import UserEditForm from './EditUserForm'
import UserProfile from '../../components/UserProfile'
import AssignDietForm from './AssignDietForm'

import {
  CButton,
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
} from '@coreui/react'

const AdminDashboard = () => {
  const [userRole, setUserRole] = useState(null)
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [showProfile, setShowProfile] = useState(false)
  const [showAssignDietForm, setShowAssignDietForm] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)
  const token = localStorage.getItem('token')

  const fetchUserData = async () => {
    if (!token) return
    try {
      const response = await axios.get('http://localhost:3001/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      setUserRole(response.data.role)
    } catch (error) {
      console.error(
        'Error obteniendo rol de usuario:',
        error.response?.data?.message || error.message,
      )
    }
  }

  const fetchUsers = useCallback(async () => {
    if (!token) return
    try {
      const response = await axios.get('http://localhost:3001/api/users', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      setUsers(response.data)
    } catch (error) {
      console.error('Error obteniendo usuarios:', error)
    }
  }, [token])

  useEffect(() => {
    fetchUserData()
    fetchUsers()
  }, [token, fetchUsers])

  const handleEditClick = (user) => {
    setSelectedUser(user)
    setShowEditForm(true)
    setShowAssignDietForm(false)
    setShowProfile(false)
  }

  const handleSave = async (updatedUser) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/api/users/${updatedUser._id}`,
        updatedUser,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      )
      setUsers(users.map((user) => (user._id === updatedUser._id ? response.data : user)))
      setSelectedUser(null)
      setShowEditForm(false)
    } catch (error) {
      console.error('Error al actualizar usuario:', error)
    }
  }

  const handleDeleteClick = async (userId) => {
    try {
      await axios.delete(`http://localhost:3001/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      setUsers(users.filter((user) => user._id !== userId))
    } catch (error) {
      console.error('Error al eliminar usuario:', error)
    }
  }

  const handleProfileClick = (user) => {
    setSelectedUser(user)
    setShowProfile(true)
    setShowEditForm(false)
    setShowAssignDietForm(false)
  }

  const handleAssignDietClick = (user) => {
    setSelectedUser(user)
    setShowAssignDietForm(true)
    setShowEditForm(false)
    setShowProfile(false)
  }

  if (userRole !== 'admin') {
    return <p>Acceso denegado</p>
  }

  return (
    <div>
      <h1>Panel de Administrador</h1>

      {/* Contenedor para el formulario de creación de usuario */}
      <div style={{ marginBottom: '20px' }}>
        <CreateUserForm token={token} fetchUsers={fetchUsers} />
      </div>

      <h2>Lista de Usuarios</h2>
      <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Nombre</CTableHeaderCell>
            <CTableHeaderCell scope="col">Email</CTableHeaderCell>
            <CTableHeaderCell scope="col">Acciones</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {users.map((user, index) => (
            <CTableRow key={user._id}>
              <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
              <CTableDataCell>{user.name}</CTableDataCell>
              <CTableDataCell>{user.email}</CTableDataCell>
              <CTableDataCell>
                <CButton color="warning" onClick={() => handleEditClick(user)}>
                  Editar
                </CButton>
                <CButton color="danger" onClick={() => handleDeleteClick(user._id)}>
                  Eliminar
                </CButton>
                <CButton color="info" onClick={() => handleProfileClick(user)}>
                  Asignar Rutina
                </CButton>
                <CButton color="success" onClick={() => handleAssignDietClick(user)}>
                  Asignar Dieta
                </CButton>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>

      {selectedUser && showProfile && <UserProfile user={selectedUser} token={token} />}
      {selectedUser && showEditForm && (
        <UserEditForm
          user={selectedUser}
          onSave={handleSave}
          onCancel={() => setSelectedUser(null)}
        />
      )}
      {selectedUser && showAssignDietForm && (
        <AssignDietForm
          user={selectedUser}
          token={token}
          onClose={() => setShowAssignDietForm(false)}
        />
      )}
    </div>
  )
}

export default AdminDashboard

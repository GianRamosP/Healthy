import React from 'react'
import UserProfile from '../components/UserProfile'
import RoutineForm from '../components/RoutineForm'

const UserProfilePage = ({ userId, token }) => {
  return (
    <div>
      <UserProfile userId={userId} token={token} />
      <RoutineForm userId={userId} token={token} />
    </div>
  )
}

export default UserProfilePage

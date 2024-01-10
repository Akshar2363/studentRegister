import React, { useContext } from 'react'
import { AuthContext } from '../context/authContext'

export const Dashboard = () => {
    const {user} = useContext(AuthContext)
    console.log(user)
  return (
    <div>{user.name}</div>
  )
}

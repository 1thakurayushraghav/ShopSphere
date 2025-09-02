import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const login = async (userData) => {
    setIsLoading(true)
    try {
      setUser(userData.user)
      // In real app, store token in secure storage
      return { success: true }
    } catch (error) {
      return { success: false, message: error.message }
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    // In real app, clear token from storage
  }

  const register = async (userData) => {
    setIsLoading(true)
    try {
      setUser(userData.user)
      return { success: true }
    } catch (error) {
      return { success: false, message: error.message }
    } finally {
      setIsLoading(false)
    }
  }

  const value = {
    user,
    isLoading,
    login,
    logout,
    register,
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
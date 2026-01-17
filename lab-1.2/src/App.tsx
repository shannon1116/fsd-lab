import { useState } from 'react'
import './App.css'
import './components/departments'
import './components/footer'
import DepartmentsList from './components/departments'
import Footer from './components/footer'

function App() {

  return (
    <>
    <DepartmentsList />
    <Footer />
    </>
  )
}

export default App

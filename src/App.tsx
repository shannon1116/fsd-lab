import { useState } from 'react'
import './App.css'
import './components/departments/departments'
import './components/common/footer/footer'
import DepartmentsList from './components/departments/departments'
import Footer from './components/common/footer/footer'

function App() {

  return (
    <>
    <DepartmentsList />
    <Footer />
    </>
  )
}

export default App

import { Routes, Route } from "react-router-dom";

import './App.css'
import './components/departments/departments'
import { Layout } from './components/common/layout/Layout';
import DepartmentsList from './components/departments/departments'

function App() {
  
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/employees" element={<DepartmentsList />}/>
      </Route>
    </Routes>
  )
}

export default App
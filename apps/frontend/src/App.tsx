import { Routes, Route } from "react-router-dom";

import './App.css';
import './components/departments/departments/departments';
import { Layout } from './components/common/layout/Layout';
import DepartmentsList from './components/departments/departments/departments';
import Organization from './components/pages/organization/organization-page';

function App() {
  
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/employees" element={<DepartmentsList />}/>
        <Route path="/organization" element={<Organization />}/>
      </Route>
    </Routes>
  )
}

export default App
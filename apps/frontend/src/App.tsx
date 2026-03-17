import { Routes, Route } from "react-router-dom";

import './App.css';
import { Layout } from './components/common/layout/Layout';
import DepartmentsList from './components/departments/departments/departments';
import Organization from './components/pages/organization/organization-page';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Child routes must be relative */}
        <Route path="employees" element={<DepartmentsList />} />
        <Route path="organization" element={<Organization />} />
      </Route>
    </Routes>
  );
}

export default App;
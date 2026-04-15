import { Routes, Route } from "react-router-dom";

import './App.css';
import { Layout } from './components/common/layout/Layout';
import DepartmentsList from './components/departments/departments/departments';
import Organization from './components/pages/organization/organization-page';

import LoginOptions from "./components/pages/user-login/login-options-page";
import LoginPage from "./components/pages/user-login/login-page";
import CreateUserPage from "./components/pages/user-login/create-user-page";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Child routes must be relative */}
        <Route path="employees" element={<DepartmentsList />} />
        <Route path="organization" element={<Organization />} />
        <Route path="/login-options" element={<LoginOptions />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/create-user" element={<CreateUserPage />} />
      </Route>
    </Routes>
  );
}

export default App;
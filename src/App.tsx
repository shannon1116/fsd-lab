import './App.css'
import './components/departments/departments'
import './components/common/footer/footer'
import DepartmentsList from './components/departments/departments'
import Footer from './components/common/footer/footer'
import EmployeeForm from './components/employees/employees'

function App() {

  return (
    <>
    <DepartmentsList />
    <Footer />
    <EmployeeForm />
    </>
  )
}

export default App

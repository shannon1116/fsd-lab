import { NavLink } from "react-router-dom";
import './Nav.css'

export function Nav(): JSX.Element {
  return (
    <nav className="navbar">
      <div className="page-links">
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/employees">
          Employees
        </NavLink>
        <NavLink to="/organization">
          Organization
        </NavLink>
        <NavLink to="/login-options">
                    Login
        </NavLink>
      </div>
    </nav>
  )
}
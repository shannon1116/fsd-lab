import { NavLink } from "react-router-dom";

export function Nav() {
    return (
        <nav className="navbar">
            <div className="page-links">
                <NavLink to="/">
                    Home
                </NavLink>
                <NavLink to="/employees">
                    Employees
                </NavLink>
                <NavLink to="/organization">
                    Organization
                </NavLink>
            </div>
        </nav>
    )
}
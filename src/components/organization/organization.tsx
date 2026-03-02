import { useState, useEffect } from "react";
import type { Roles, Employees } from './role';
import { pixellRiverLeadershipRoles } from './role';
import { OrganizationForm } from "./organizationForm";
import {
    initializeRoles,
    getRoles,
    addEmployee,
} from "../../repository/organizationRepo";
import "./organization.css";

function OrganizationDisplay({
    defaultRolesEmployees
}: {
    defaultRolesEmployees: Roles[];
}) {
    return (
        <>
            <h2>Leadership and Management</h2>
            <ul>
                {defaultRolesEmployees.map(role => (
                    <li className="roles" key={role.name}>
                        <strong>{role.name}</strong>
                            <ul >
                                {role.employees.map(employee => (
                                    <li className="employees" key={role.name}>
                                        {employee.firstName} {employee.lastName}
                                    </li>
                                ))}
                            </ul>
                    </li>
                )
              )}
            </ul>
        </>
    )
}

export default function OrganizationList () {
    const [roles, setRoles] = useState<Roles[]>([]);

    useEffect(() => {
        console.log("Initializing roles...");
        initializeRoles(pixellRiverLeadershipRoles);
        setRoles(getRoles());
    }, []);

    const handleAddRole = (
        roleName: string,
        employee: Employees
    ) => {
        const updated = addEmployee(roleName, employee);
        setRoles([...updated]);
    };

    return (
        <>
            <OrganizationDisplay defaultRolesEmployees={roles} />
            <OrganizationForm onSubmit={handleAddRole} />
        </>
    );
}
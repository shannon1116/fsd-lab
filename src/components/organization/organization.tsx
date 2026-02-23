import { useState, useEffect } from "react";
import type { Roles, Employees } from './role';
import { pixellRiverLeadershipRoles } from './role';
import { OrganizationForm } from "./organizationForm";
import "./organization.css";

function OrganizationDisplay({
    rolesEmployees
}: {
    rolesEmployees: Roles[];
}) {
    return (
        <>
            <h2>Leadership and Management</h2>
            <ul>
                {rolesEmployees.map(role =>(
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
    const [roles, setRoles] = useState<Roles[]>(
        pixellRiverLeadershipRoles
    );

    const handleAddRole = (
        roleName: string,
        employee: Employees
    ) => {
        setRoles(prev => {
            const existingRole = prev.find(role => role.name === roleName);

            if (existingRole) {
                return prev.map(role =>
                    role.name === roleName
                        ? { ...role, employees: [...role.employees, employee] }
                        : role
                );
            };

            return [...prev, { name: roleName, employees: [employee] }];
        });
    };

    return (
        <>
            <OrganizationDisplay rolesEmployees={roles} />
            <OrganizationForm onSubmit={handleAddRole} />
        </>
    );
}
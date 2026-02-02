import type { Roles } from './role';
import { pixellRiverLeadershipRoles } from './role';
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

export function OrganizationList () {
    return (
        <>
            <OrganizationDisplay rolesEmployees={pixellRiverLeadershipRoles} />
        </>
    )
}
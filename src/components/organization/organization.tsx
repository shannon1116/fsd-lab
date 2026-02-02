import type { Roles } from './role';
import { pixellRiverLeadershipRoles } from './role';

function OrganizationDisplay({
    rolesEmployees
}: {
    rolesEmployees: Roles[];
}) {
    return (
        <>
        <header>
            <h1>Pixell River Financial</h1>
        </header>
            <h2>Leadership and Management</h2>
            <ul>
                {rolesEmployees.map(role =>(
                    <li key={role.name}>
                        <strong>{role.name}</strong>
                            <ul>
                                {role.employees.map(employee => (
                                    <li key={role.name}>
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
    return (
        <>
            <OrganizationDisplay rolesEmployees={pixellRiverLeadershipRoles} />
        </>
    )
}
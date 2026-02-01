import type { Roles, Employees } from './role';
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
                    <li key={department.name}>
                        <strong>{department.name}</strong>
                            <ul>
                                {department.employees.map(employee => (
                                    <li key={department.name}>
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

export default function DepartmentsList () {
    return (
        <>
            <DepartmentsDisplay departmentEmployees={pixellRiverEmployees} />
        </>
    )
}
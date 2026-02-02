import { useState } from "react";
import type { Departments, Employees } from "../departmentEmployees/departmentEmployeesData";
import { pixellRiverEmployees } from "../departmentEmployees/departmentEmployeesData";
import { EmployeeForm } from "../employees/employees";

function DepartmentsDisplay({
    defaultDepartmentEmployees
}: {
    defaultDepartmentEmployees: Departments[];
}) {
    return (
        <>
            <h2>Employees</h2>
            <ul>
                {defaultDepartmentEmployees.map(department =>(
                    <li key={department.name}>
                        <strong>{department.name}</strong>
                            <ul>
                                {department.employees.map(employee => (
                                    <li key={`${department.name}-${employee.firstName}-${employee.lastName}`}>
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
    const [departments, setDepartments] = useState<Departments[]>(
        pixellRiverEmployees
    );

    const handleAddEmployee = (
        departmentName: string,
        employee: Employees
    ) => {
        setDepartments(prev =>
            prev.map(department =>
                department.name === departmentName
                    ? { ...department, employees: [...department.employees, employee] }
                    : department
            )
        );
    };

    return (
        <>
            <DepartmentsDisplay defaultDepartmentEmployees={departments} />
            <EmployeeForm onSubmit={handleAddEmployee} />
        </>
    );
}
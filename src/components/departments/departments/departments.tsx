import { useState, useEffect } from "react";
import type { Departments, Employees } from "../../departments/departmentEmployees/departmentEmployeesData";
import { pixellRiverEmployees } from "../../departments/departmentEmployees/departmentEmployeesData";
import { EmployeeForm } from "../../departments/employees/employees";
import {
    initializeDepartments,
    getDepartments,
    addEmployee,
} from "../../../repository/employeeRepo";

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
    const [departments, setDepartments] = useState<Departments[]>([]);
    
    useEffect(() => {
        initializeDepartments(pixellRiverEmployees);
        setDepartments(getDepartments());
    }, []);

    const handleAddEmployee = (
        departmentName: string,
        employee: Employees
    ) => {
        const updated = addEmployee(departmentName, employee);
        setDepartments([...updated]);
    };

    return (
        <>
            <DepartmentsDisplay defaultDepartmentEmployees={departments} />
            <EmployeeForm onSubmit={handleAddEmployee} />
        </>
    );
}
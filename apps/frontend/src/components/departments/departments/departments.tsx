import { useState, useEffect } from "react";
import type { Departments, Employees } from "../../departments/departmentEmployees/departmentEmployeesData";
import { EmployeeForm } from "../../departments/employees/employees";
import {
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
                {defaultDepartmentEmployees.map(department => (
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
                ))}
            </ul>
        </>
    );
}

export default function DepartmentsList() {
    const [departments, setDepartments] = useState<Departments[]>([]);

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const departments = await getDepartments();
                setDepartments(departments);
            } catch (error) {
                console.error("Failed to load departments:", error);
            }
        };
        fetchDepartments();
    }, []);

    const handleAddEmployee = async (departmentName: string, employee: Employees) => {
        try {
            const updatedDepartments = await addEmployee(departmentName, employee);
            setDepartments(updatedDepartments);
        } catch (error) {
            console.error("Failed to add employee:", error);
        }
    };

    return (
        <>
            <DepartmentsDisplay defaultDepartmentEmployees={departments} />
            <EmployeeForm onSubmit={handleAddEmployee} />
        </>
    );
}
import React from "react";
import { useFormInput } from "../../../hooks/useFormInput";
import type { Employees } from "../../../components/departments/departmentEmployees/departmentEmployeesData";

type EmployeeFormProps = {
    onSubmit: (department: string, employee: Employees) => void;
};

export function EmployeeForm({ onSubmit }: EmployeeFormProps) {
    const form = useFormInput();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const employee = form.getEmployee();
        if (!employee) return;

        if (onSubmit) onSubmit(form.departmentName, employee);

        await form.submitEmployee();
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>
                    First Name:
                    <input
                        type="text"
                        value={form.firstName}
                        onChange={(employee) => form.valueChangeHandler("firstName", employee.target.value)}
                    />
                </label>
                {form.errors.map((error, i) => (
                    <p key={i} style={{ color: "red" }}>{error}</p>
                ))}

                <label>
                    Last Name:
                    <input
                        type="text"
                        value={form.lastName}
                        onChange={(employee) => form.valueChangeHandler("lastName", employee.target.value)}
                    />
                </label>

                <label>
                    Department:
                    <select
                        value={form.departmentName}
                        onChange={(employee) => form.valueChangeHandler("departmentName", employee.target.value)}
                    >
                        <option value="">Select Department</option>
                        {form.departments.map((department) => (
                            <option key={department.name} value={department.name}>{department.name}</option>
                        ))}
                    </select>
                </label>

                <input type="submit" />
            </form>

            {form.success && <p style={{ color: "green" }}>{form.success}</p>}
        </>
    );
}
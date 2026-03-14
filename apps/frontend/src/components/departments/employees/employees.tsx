import { useState } from "react";
import useEmployeeForm from "../../../hooks/useFormInput";
import type { Employees } from "../../../components/departments/departmentEmployees/departmentEmployeesData";

type EmployeeFormProps = {
    onSubmit: (department: string, employee: Employees) => void;
};

export function EmployeeForm({ onSubmit }: EmployeeFormProps) {
    const form = useEmployeeForm();
    const departments = form.getDepartments();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const employee = form.getEmployee();
        if (!employee) return;

        onSubmit(form.departmentName, employee);
        form.inputReset();
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>
                    First Name:
                    <input
                        type="text"
                        value={form.firstName}
                        onChange={(e) => form.valueChangeHandler("firstName", e.target.value)}
                    />
                </label>
                {form.errors.map((err, i) => (
                    <p key={i} style={{ color: "red" }}>{err}</p>
                ))}

                <label>
                    Last Name:
                    <input
                        type="text"
                        value={form.lastName}
                        onChange={(e) => form.valueChangeHandler("lastName", e.target.value)}
                    />
                </label>

                <label>
                    Department:
                    <select
                        value={form.departmentName}
                        onChange={(e) => form.valueChangeHandler("departmentName", e.target.value)}
                    >
                        <option value="">Select Department</option>
                        {departments.map((d) => (
                            <option key={d.name} value={d.name}>{d.name}</option>
                        ))}
                    </select>
                </label>

                <input type="submit" />
            </form>

            {form.success && <p style={{ color: "green" }}>{form.success}</p>}
        </>
    );
}
import { useState, useEffect } from "react";
import type { Departments, Employees } from "../components/departments/departmentEmployees/departmentEmployeesData";
import * as employeeService from "../services/employeeService";

interface UseEmployeeFormResult {
    firstName: string;
    lastName: string;
    departmentName: string;
    errors: string[];
    success: string;
    departments: Departments[];
    valueChangeHandler: (field: string, value: string) => void;
    inputReset: () => void;
    validate: () => boolean;
    getEmployee: () => Employees | null;
    submitEmployee: () => Promise<void>;
}

export const useFormInput = (): UseEmployeeFormResult => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [departmentName, setDepartmentName] = useState("");
    const [errors, setErrors] = useState<string[]>([]);
    const [success, setSuccess] = useState("");
    const [departments, setDepartments] = useState<Departments[]>([]);

    useEffect(() => {
        employeeService.getDepartments().then(setDepartments).catch(console.error);
    }, []);

    const valueChangeHandler = (field: string, value: string) => {
        if (field === "firstName") setFirstName(value);
        else if (field === "lastName") setLastName(value);
        else if (field === "departmentName") setDepartmentName(value);

        setErrors([]);
        setSuccess("");
    };

    const inputReset = () => {
        setFirstName("");
        setLastName("");
        setDepartmentName("");
        setErrors([]);
        setSuccess("");
    };

    const validate = (): boolean => {
        const firstValidation = employeeService.validateFirstName(firstName);
        const lastValidation = employeeService.validateLastName(lastName);

        const allErrors = [...firstValidation.errors, ...lastValidation.errors];
        if (!departmentName) allErrors.push("Please select a department.");

        setErrors(allErrors);
        setSuccess(allErrors.length === 0 ? "Form is valid!" : "");
        return allErrors.length === 0;
    };

    const getEmployee = (): Employees | null => {
        if (!validate()) return null;
        return { firstName: firstName.trim(), lastName: lastName.trim() };
    };

    const submitEmployee = async (): Promise<void> => {
        if (!validate()) return;

        try {
            const updatedDepartments = await employeeService.addEmployee(departmentName, {
                firstName: firstName.trim(),
                lastName: lastName.trim()
            });

            setDepartments(updatedDepartments);

            setSuccess("Employee added successfully!");
            setErrors([]);
            inputReset();
        } catch (err: any) {
            setErrors([err.message || "Failed to add employee"]);
            setSuccess("");
        }
    };

    return {
        firstName,
        lastName,
        departmentName,
        errors,
        success,
        departments,
        valueChangeHandler,
        inputReset,
        validate,
        getEmployee,
        submitEmployee,
    };
};
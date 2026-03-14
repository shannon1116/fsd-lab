import { useState } from "react";
import type { Departments, Employees } from "../components/departments/departmentEmployees/departmentEmployeesData";
import * as employeeService from "../services/employeeService";

interface UseEmployeeFormResult {
    firstName: string;
    lastName: string;
    departmentName: string;
    errors: string[];
    success: string;
    valueChangeHandler: (field: string, value: string) => void;
    inputReset: () => void;
    validate: () => boolean;
    getEmployee: () => Employees | null;
    getDepartments: () => Departments[];
}

const useEmployeeForm = (): UseEmployeeFormResult => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [departmentName, setDepartmentName] = useState("");
    const [errors, setErrors] = useState<string[]>([]);
    const [success, setSuccess] = useState("");

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
        return { firstName, lastName };
    };

    const getDepartments = () => employeeService.getDepartments();

    return {
        firstName,
        lastName,
        departmentName,
        errors,
        success,
        valueChangeHandler,
        inputReset,
        validate,
        getEmployee,
        getDepartments,
    };
};

export default useEmployeeForm;
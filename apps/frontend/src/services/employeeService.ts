import type { Departments, Employees } from  "../components/departments/departmentEmployees/departmentEmployeesData";
import * as employeeRepo from "../repository/employeeRepo";

export interface ValidationResult {
    isValid: boolean;
    errors: string[];
}

function validateName(value: string, field: string): ValidationResult {
    const errors: string[] = [];

    if (!value || value.trim().length < 3) {
        errors.push(`${field} needs at least 3 characters.`);
    }

    return {
        isValid: errors.length === 0,
        errors,
    }
}

export const validateFirstName = (firstName: string) =>
    validateName(firstName, "First Name");

export const validateLastName = (lastName: string) =>
    validateName(lastName, "Last Name");

export const initializeDepartments = (data : Departments[]) =>{
    return employeeRepo.initializeDepartments(data);
};

export const getDepartments = (): Departments[] => {
    return employeeRepo.getDepartments();
};

export const addEmployee = (
    departmentName: string,
    employee: Employees
): Departments[] => {
    const firstNameValidation = validateFirstName(employee.firstName);
    const lastNameValidation = validateLastName(employee.lastName);

    const errors = [
        ...firstNameValidation.errors,
        ...lastNameValidation.errors
    ];

    if (errors.length > 0) {
        throw new Error(errors.join(" "));
    }

    const newEmployee: Employees = { ...employee };

    // Update repo and return the updated departments
    return employeeRepo.addEmployee(departmentName, newEmployee);
};
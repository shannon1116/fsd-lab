import type { Roles, Employees } from "../components/organization/role";
import * as organizationRepo from "../repository/organizationRepo";

export interface ValidationResult {
    isValid: boolean;
    errors: string[];
}

/**
 * Validates a name field
 */
function validateName(value: string, field: string): ValidationResult {
    const errors: string[] = [];
    const trimmed = value?.trim() ?? "";

    if (trimmed.length < 3) {
        errors.push(`${field} needs at least 3 characters.`);
    }

    return { isValid: errors.length === 0, errors };
}

export const validateFirstName = (firstName: string) =>
    validateName(firstName, "First Name");

export const validateLastName = (lastName: string) =>
    validateName(lastName, "Last Name");

/**
 * Fetch all roles via repo
 */
export const getRoles = (): Promise<Roles[]> => {
    return organizationRepo.getRoles();
};

/**
 * Validate role name against existing roles
 */
export function validateRole(roleName: string, roles: { name: string }[]): ValidationResult {
    const errors: string[] = [];
    const trimmedRole = roleName.trim();

    if (trimmedRole.length < 3) {
        errors.push("Role needs at least 3 characters.");
    }

    const roleExists = roles.some(role => role.name.trim().toLowerCase() === trimmedRole.toLowerCase());
    if (roleExists) {
        errors.push("Role already exists in leadership list.");
    }

    return { isValid: errors.length === 0, errors };
}

/**
 * Add a new employee to a role
 * - Validates names
 * - Prevents duplicates
 */
export const addEmployee = async (
    roleName: string,
    employee: Employees
): Promise<Roles> => {  
    const firstNameValidation = validateFirstName(employee.firstName);
    const lastNameValidation = validateLastName(employee.lastName);
    const errors = [...firstNameValidation.errors, ...lastNameValidation.errors];

    if (errors.length > 0) {
        throw new Error(errors.join(" "));
    }

    const trimmedEmployee: Employees = {
        firstName: employee.firstName.trim(),
        lastName: employee.lastName.trim()
    };

    return organizationRepo.addEmployee(roleName, trimmedEmployee);
};

/**
 * Create a new role
 * - Optionally adds an initial employee
 * - Prevents duplicate role names
 */
export const createRole = async (
    roleName: string,
    employee?: Employees
): Promise<Roles> => {
    const roles = await getRoles();

    const roleValidation = validateRole(roleName, roles);
    if (!roleValidation.isValid) {
        throw new Error(roleValidation.errors.join(" "));
    }

    const employees: Employees[] = [];
    if (employee) {
        const firstNameValidation = validateFirstName(employee.firstName);
        const lastNameValidation = validateLastName(employee.lastName);
        const employeeErrors = [...firstNameValidation.errors, ...lastNameValidation.errors];

        if (employeeErrors.length > 0) {
            throw new Error(employeeErrors.join(" "));
        }

        employees.push({
            firstName: employee.firstName.trim(),
            lastName: employee.lastName.trim()
        });
    }

    return organizationRepo.createRole(roleName.trim(), employees);
};
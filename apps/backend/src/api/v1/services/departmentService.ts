import { Departments, Employees } from "../models/departmentModel";

import { pixellRiverEmployees } from "../repositories/departmentData";

const departments: Departments[] = pixellRiverEmployees;

/**
 * Retrieves all departments from storage
 * @returns Array of all items
 */
export const getAllDepartments = async (): Promise<Departments[]> => {
    return structuredClone(departments);
};

/**
 * Creates a new department
 * @param departmentData - The data for the new department (name and employee)
 * @returns The created department
 */
export const createDepartment = async (departmentData: {
    name: string;
    employees?: Employees[]
}): Promise<Departments> => {
    const newDepartment: Departments = {
        name: departmentData.name,
        employees: departmentData.employees ?? []
    };

    departments.push(newDepartment);

    return structuredClone(newDepartment);
};

/**
 * Updates (replaces) an existing item
 * @param departmentData - The fields to updates (name and/or description)
 * @returns The updated department
 * @throws Error if department with given name is not found
 */
export const updateDepartment = async (
    departmentData: Pick<Departments, "name" | "employees">
): Promise<Departments> => {
    const index = departments.findIndex((department: Departments) => department.name === departmentData.name);

    if (index === -1) {
        throw new Error(`Department ${departmentData.name} not found`);
    }

    departments[index] = {
        ...departments[index],
        ...departmentData
    };

    return structuredClone(departments[index]);
};

/**
 * Creates a new employee
 * @param employeeData - The data for the new employee (firstName and lastName)
 * @returns The created employee
 */
export const addEmployeeToDepartment = async (
    departmentName: string, 
    employeeData: { firstName: string; lastName: string}
): Promise<Departments> => {
    const department = departments.find(department => department.name === departmentName);
    if (!department) throw new Error(`Department ${departmentName} not found`);

    const newEmployee: Employees = {
        firstName: employeeData.firstName,
        lastName: employeeData.lastName
    };

    department.employees.push(newEmployee);

    return structuredClone(department);
};
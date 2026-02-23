import type { Departments, Employees } from "../components/departmentEmployees/departmentEmployeesData";

let departmentsData: Departments[] = [];

export const initializeDepartments = (data: Departments[]) => {
    departmentsData = [...data];
};

export const getDepartments = (): Departments[] => {
    return departmentsData;
};

export const addEmployee = (
    departmentName: string,
    employee: Employees
): Departments[] => {
    departmentsData = departmentsData.map((department) =>
        department.name === departmentName
            ? { ...department, employees: [...department.employees, employee] }
            : department
    );

    return departmentsData;
};
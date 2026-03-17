import type { Departments, Employees } from "../components/departments/departmentEmployees/departmentEmployeesData";

type DepartmentsResponseJSON = { message: string; data: Departments[] };

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1`;
const DEPARTMENT_ENDPOINT = "/departments";

let departmentsData: Departments[] = [];

export async function getDepartments(): Promise<Departments[]> {
    const departmentResponse: Response = await fetch(`${BASE_URL}${DEPARTMENT_ENDPOINT}`);

    if (!departmentResponse.ok) {
        throw new Error("Failed to fetch departments");
    }

    const json: DepartmentsResponseJSON = await departmentResponse.json();
    departmentsData = json.data; 
    return json.data;
}

export const addEmployee = async (departmentName: string, employee: Employees): Promise<Departments[]> => {
    if (departmentsData.length === 0) {
        await getDepartments(); // ensure data is loaded
    }

    const departmentIndex = departmentsData.findIndex(d => d.name === departmentName);
    if (departmentIndex === -1) {
        throw new Error(`Department ${departmentName} not found`);
    }

    const updatedDepartments = [...departmentsData];
    updatedDepartments[departmentIndex] = {
        ...updatedDepartments[departmentIndex],
        employees: [...updatedDepartments[departmentIndex].employees, employee]
    };

    departmentsData = updatedDepartments;
    return updatedDepartments;
};
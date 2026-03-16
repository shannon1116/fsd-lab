import type { Roles, Employees } from "../components/organization/role";

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1`;
const ORGANIZATIONS_ENDPOINT = "/organizations";

let rolesData: Roles[] = [];

/**
 * Fetch all roles from backend
 */
export async function getRoles(): Promise<Roles[]> {
    const response = await fetch(`${BASE_URL}${ORGANIZATIONS_ENDPOINT}`);
    if (!response.ok) {
        throw new Error("Failed to fetch roles");
    }
    const json = await response.json() as { message: string; data: Roles[] };
    rolesData = json.data;
    return rolesData;
}

export async function createRole(roleName: string, employees: Employees[] = []): Promise<Roles> {
    const payload = {
        name: roleName.trim(),
        employees: employees.map(employee => ({
            firstName: employee.firstName.trim(),
            lastName: employee.lastName.trim()
        }))
    };

    const response = await fetch(`${BASE_URL}${ORGANIZATIONS_ENDPOINT}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create role");
    }

    const json = await response.json() as { message: string; data: Roles };

    rolesData = [...rolesData, json.data];

    return json.data;
}

export async function addEmployee(roleName: string, employee: Employees): Promise<Roles> {
    // Find the role in local cache
    const role = rolesData.find(role => role.name.toLowerCase() === roleName.toLowerCase());
    if (!role) {
        throw new Error(`Role '${roleName}' not found`);
    }

    const payload = {
        firstName: employee.firstName.trim(),
        lastName: employee.lastName.trim()
    };

    const response = await fetch(`${BASE_URL}${ORGANIZATIONS_ENDPOINT}/${encodeURIComponent(roleName)}/employees`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add employee");
    }

    const updatedRole = await response.json() as { message: string; data: Roles };

    rolesData = rolesData.map(role =>
        role.name.toLowerCase() === updatedRole.data.name.toLowerCase() ? updatedRole.data : role
    );

    return updatedRole.data;
}
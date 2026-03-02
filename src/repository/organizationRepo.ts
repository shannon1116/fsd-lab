import type { Roles, Employees } from "../components/organization/role";

let rolesData: Roles[] = [];

export const initializeRoles = (data: Roles[]) => {
    rolesData = data.map(role => ({
        ...role,
        employees: [...role.employees],
    }));
};

export const getRoles = (): Roles[] => {
    return rolesData;
};

export const addEmployee = (
    roleName: string,
    employee: Employees
): Roles[] => {
    const roleExists = rolesData.some(role => role.name === roleName);

    if (roleExists) {
        rolesData = rolesData.map((role) =>
            role.name === roleName
                ? { ...role, employees: [...role.employees, employee] }
                : role
        ); 
    } else {
        rolesData = [
            ...rolesData,
            {
                name: roleName,
                employees: [employee],
            },
        ];
    }

    return rolesData;
};
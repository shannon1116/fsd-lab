import { Roles, Employees } from "../models/roleModel";
import { pixellRiverLeadershipRoles } from "../repositories/roleData";

// In-memory storage for demo purposes
const roles: Roles[] = structuredClone(pixellRiverLeadershipRoles);

/**
 * Retrieves all roles from storage
 */
export const getAllRoles = async (): Promise<Roles[]> => {
  return structuredClone(roles);
};

/**
 * Creates a new role
 */
export const createRole = async (roleData: {
  name: string;
  employees?: Employees[];
}): Promise<Roles> => {

  const roleName = roleData.name.trim();

  if (
    roles.some(
      role => role.name.toLowerCase() === roleName.toLowerCase()
    )
  ) {
    throw new Error(`Role '${roleName}' already exists`);
  }

  const newRole: Roles = {
    name: roleName,
    employees: roleData.employees ?? []
  };

  roles.push(newRole);

  return structuredClone(newRole);
};

/**
 * Adds an employee to a role
 */
export const addEmployee = async (
  roleName: string,
  employeeData: { firstName: string; lastName: string }
): Promise<Roles> => {

  const normalizedRole = roleName.trim().toLowerCase();

  const role = roles.find(
    r => r.name.toLowerCase() === normalizedRole
  );

  if (!role) {
    throw new Error(`Role '${roleName}' not found`);
  }

  const firstName = employeeData.firstName.trim();
  const lastName = employeeData.lastName.trim();

  const employeeExists = role.employees.some(
    e =>
      e.firstName.toLowerCase() === firstName.toLowerCase() &&
      e.lastName.toLowerCase() === lastName.toLowerCase()
  );

  if (employeeExists) {
    throw new Error("Employee already exists in this role");
  }

  const newEmployee: Employees = {
    firstName,
    lastName
  };

  role.employees.push(newEmployee);

  return structuredClone(role);
};
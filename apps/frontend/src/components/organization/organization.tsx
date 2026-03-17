import { useState, useEffect } from "react";
import type { Roles, Employees } from "./role";
import { OrganizationForm } from "./organizationForm";
import * as organizationService from "../../services/organizationService";
import "./organization.css";

function OrganizationDisplay({ roles }: { roles: Roles[] }) {
    return (
        <>
            <h2>Leadership and Management</h2>
            {roles.length === 0 ? (
                <p>No roles found.</p>
            ) : (
                <ul>
                    {roles.map((role) => (
                        <li className="roles" key={role.name}>
                            <strong>{role.name}</strong>
                            <ul>
                                {role.employees.map((emp) => (
                                    <li
                                        className="employees"
                                        key={`${emp.firstName}-${emp.lastName}`}
                                    >
                                        {emp.firstName} {emp.lastName}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}

export default function OrganizationList() {
    const [roles, setRoles] = useState<Roles[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const data = await organizationService.getRoles();
                setRoles(data);
            } catch (error: any) {
                setError("Failed to load roles.");
            } finally {
                setLoading(false);
            }
        };
        fetchRoles();
    }, []);

    const handleAddRole = async (roleName: string, employee: Employees) => {
        try {
            setError(null);
            const existingRole = roles.find(
                (role) => role.name.toLowerCase() === roleName.toLowerCase()
            );

            if (existingRole) {
                const updatedRole: Roles = await organizationService.addEmployee(existingRole.name, employee);
                setRoles((prevRoles) =>
                    prevRoles.map((role) =>
                        role.name.toLowerCase() === updatedRole.name.toLowerCase() ? updatedRole : role
                    )
                );
            } else {
                const newRole: Roles = await organizationService.createRole(roleName, employee);
                setRoles((prevRoles) => [...prevRoles, newRole]);
            }
        } catch (error: any) {
            setError(error.message || "Failed to add employee or create role.");
        }
    };

    return (
        <>
            {loading && <p>Loading roles...</p>}
            {error && <p className="error">{error}</p>}
            {!loading && !error && <OrganizationDisplay roles={roles} />}
            <OrganizationForm onSubmit={handleAddRole} />
        </>
    );
}
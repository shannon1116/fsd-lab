import { useState, useEffect } from "react";
import type { Roles, Employees } from "../components/organization/role";
import * as organizationService from "../services/organizationService";

interface UseRoleFormResult {
    firstName: string;
    lastName: string;
    roleName: string;
    errors: string[];
    success: string;
    roles: Roles[];
    valueChangeHandler: (field: string, value: string) => void;
    inputReset: () => void;
    validate: () => boolean;
    getEmployee: () => Employees | null;
    submitEmployee: () => Promise<void>;
}

export const useFormInput = (): UseRoleFormResult => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [roleName, setRoleName] = useState("");
    const [errors, setErrors] = useState<string[]>([]);
    const [success, setSuccess] = useState("");
    const [roles, setRoles] = useState<Roles[]>([]);

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const data = await organizationService.getRoles();
                setRoles(data);
            } catch (error: any) {
                console.error("Failed to load roles:", error);
                setErrors([error.message || "Failed to load roles"]);
            }
        };
        fetchRoles();
    }, []);

    const valueChangeHandler = (field: string, value: string) => {
        if (field === "firstName") setFirstName(value);
        else if (field === "lastName") setLastName(value);
        else if (field === "roleName") setRoleName(value);

        setErrors([]);
        setSuccess("");
    };

    const inputReset = () => {
        setFirstName("");
        setLastName("");
        setRoleName("");
        setErrors([]);
        setSuccess("");
    };

    const validate = (): boolean => {
        const firstValidation = organizationService.validateFirstName(firstName);
        const lastValidation = organizationService.validateLastName(lastName);
        const roleValidation = organizationService.validateRole(roleName, roles);

        const allErrors = [
            ...firstValidation.errors,
            ...lastValidation.errors,
            ...roleValidation.errors
        ];

        setErrors(allErrors);
        setSuccess(allErrors.length === 0 ? "Form is valid!" : "");
        return allErrors.length === 0;
    };

    const getEmployee = (): Employees | null => {
        if (!validate()) return null;
        return {
            firstName: firstName.trim(),
            lastName: lastName.trim()
        };
    };

    const submitEmployee = async (): Promise<void> => {
        if (!validate()) return;

        try {
            const existingRole = roles.find(
                role => role.name.toLowerCase() === roleName.trim().toLowerCase()
            );

            if (existingRole) {
                const updatedRole: Roles = await organizationService.addEmployee(roleName, {
                    firstName: firstName.trim(),
                    lastName: lastName.trim()
                });

                setRoles(prevRoles =>
                    prevRoles.map(role =>
                        role.name.toLowerCase() === updatedRole.name.toLowerCase()
                            ? updatedRole
                            : role
                    )
                );
            } else {
                const newRole: Roles = await organizationService.createRole(roleName, {
                    firstName: firstName.trim(),
                    lastName: lastName.trim()
                });

                setRoles(prevRoles => [...prevRoles, newRole]);
            }

            setSuccess("Employee added successfully!");
            setErrors([]);
            inputReset();
        } catch (error: any) {
            console.error("Failed to add employee or create role:", error);
            setErrors([error.message || "Failed to add employee or create role"]);
            setSuccess("");
        }
    };

    return {
        firstName,
        lastName,
        roleName,
        errors,
        success,
        roles,
        valueChangeHandler,
        inputReset,
        validate,
        getEmployee,
        submitEmployee
    };
};
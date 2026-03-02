import { pixellRiverLeadershipRoles } from "../components/organization/role";

export function validateFirstName(firstName: string): {
    isValid: boolean;
    errors: string[];
} {
    const errors: string[] = [];

    if(firstName.trim().length < 3) {
        errors.push("First Name needs at least 3 characters.");
    }

    return { 
        isValid: errors.length === 0,
        errors,
    };
}

export function validateLastName(lastName: string): {
    isValid: boolean;
    errors: string[];
} {
    const errors: string[] = [];

    if(lastName.trim().length < 3) {
        errors.push("Last Name needs at least 3 characters.");
    }

    return { 
        isValid: errors.length === 0,
        errors,
    };
}

export function validateRole(role: string): {
    isValid: boolean;
    errors: string[];
} {
    const errors: string[] = [];
    const trimmedRole = role.trim();

    if(trimmedRole.trim().length < 3) {
        errors.push("Role needs at least 3 characters.");
    }

    const roleExists = pixellRiverLeadershipRoles.some(
        (existingRole) =>
            existingRole.name.toLowerCase() === trimmedRole.toLowerCase()
    );

    if(roleExists) {
        errors.push("Role already exists in leadership list.")
    }

    return { 
        isValid: errors.length === 0,
        errors,
    };
}
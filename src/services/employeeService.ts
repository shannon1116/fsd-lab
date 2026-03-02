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

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
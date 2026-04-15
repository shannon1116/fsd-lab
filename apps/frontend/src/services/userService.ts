import type { User } from  "../../../../shared/types/user";
import * as userRepo from "../repository/userRepo";

export interface ValidationResult {
    isValid: boolean;
    errors: string[];
}

function validateName(value: string, field: string): ValidationResult {
    const errors: string[] = [];

    if (!value || value.trim().length < 3) {
        errors.push(`${field} needs at least 3 characters.`);
    }

    return {
        isValid: errors.length === 0,
        errors,
    }
}

export const validateUserName = (userName: string) =>
    validateName(userName, "User Name");

export const addUser = async (
    userName: string,
): Promise<User[]> => {
    const userNameValidation = validateUserName(userName);

    const errors = [
        ...userNameValidation.errors,
    ];

    if (errors.length > 0) {
        throw new Error(errors.join(" "));
    }

    const newUser: User = { 
        userName: userName.trim(),
    };

    return userRepo.addUser(newUser);
};
import { useState, useEffect } from "react";
import type { Employee } from "../../../../shared/types/employee";
import type { User } from "../../../../shared/types/user";
import * as userService from "../services/userService";

interface UseCreateUserFormResult {
    userName: string;
    errors: string[];
    success: string;
    valueChangeHandler: (field: string, value: string) => void;
    inputReset: () => void;
    validate: () => boolean;
    getUser: () => User | null;
    submitUser: () => Promise<void>;
}

export const useCreateUserFormInput = (): UseCreateUserFormResult => {
    const [userName, setUserName] = useState("");
    const [errors, setErrors] = useState<string[]>([]);
    const [success, setSuccess] = useState("");

    const valueChangeHandler = (field: string, value: string) => {
        if (field === "userName") setUserName(value);

        setErrors([]);
        setSuccess("");
    };

    const inputReset = () => {
        setUserName("");
        setErrors([]);
        setSuccess("");
    };

    const validate = (): boolean => {
        const userNameValidation = userService.validateUserName(userName);

        const allErrors = [...userNameValidation.errors];

        setErrors(allErrors);
        setSuccess(allErrors.length === 0 ? "Form is valid!" : "");
        return allErrors.length === 0;
    };

    const getUser = (): User | null => {
        if (!validate()) return null;
        return { userName: userName.trim() };
    };

    const submitUser = async (): Promise<void> => {
        if (!validate()) return;

        try {
            const updatedUsers = await userService.addUser(userName);

            setSuccess("User created successfully!");
            setErrors([]);
            inputReset();
        } catch (err: any) {
            setErrors([err.message || "Failed to add user"]);
            setSuccess("");
        }
    };

    return {
        userName,
        errors,
        success,
        valueChangeHandler,
        inputReset,
        validate,
        getUser,
        submitUser,
    };
};
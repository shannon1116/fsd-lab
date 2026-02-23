import { useState } from "react";

//import useFormInput from "../../../hooks/useFormInput";
//import { validateFirstName } from "../../../services/employeeService";

type OrganizationFormProps = {
    onSubmit: (
        roles: string,
        employee: { firstName: string; lastName: string }
    ) => void;
};

export function OrganizationForm({ onSubmit }: OrganizationFormProps) {
    const firstName = useFormInput(validateFirstName);
    const lastName = useFormInput(validateFirstName);
    
    const [role, setRole] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const firstNameValid = firstName.validate();
        const lastNameValid = lastName.validate();
        const roleValid = role.trim() !== "";

        if (!firstNameValid || !lastNameValid || !roleValid) {
            setError("Please fill in all fields correctly.");
            setSuccess("");
            return;
        }

        onSubmit(role, {
            firstName: firstName.value,
            lastName: lastName.value,
        });

        setError("");
        setSuccess("Form is valid!");
        firstName.inputReset();
        lastName.inputReset();
        setRole("");
    };

    return (
    <>
    <form onSubmit={handleSubmit}>
    <label htmlFor="firstName">First Name:
        <input
            id="firstName"
            type="text"
            placeholder="Enter First Name"
            value={firstName.value}
            onChange={firstName.valueChangeHandler}
        />
    </label>
    <label htmlFor="lastName">Last Name:
        <input
            id="lastName"
            type="text"
            placeholder="Enter Last Name"
            value={lastName.value}
            onChange={lastName.valueChangeHandler}
        />
    </label>
    <form onSubmit={handleSubmit}>
    <label htmlFor="roleName"> Role:
        <input
            id="roleName"
            type="text"
            placeholder="Enter Role"
            value={firstName.value}
            onChange={firstName.valueChangeHandler}
        />
    </label>
    <input type="submit"/>
    </form>
    {error && <p style={{ color: "red"}}>{error}</p>}
    {success && <p style={{ color: "green" }}>{success}</p>}
    </>
    );
}

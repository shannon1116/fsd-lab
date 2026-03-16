import { useState } from "react";

import{ useFormInput } from "../../hooks/useFormInput";
import { validateFirstName, validateLastName, validateRole } from "../../services/organizationService";

type OrganizationFormProps = {
    onSubmit: (
        role: string,
        employee: { firstName: string; lastName: string }
    ) => void;
};

export function OrganizationForm({ onSubmit }: OrganizationFormProps) {
    const firstName = useFormInput(validateFirstName);
    const lastName = useFormInput(validateLastName);
    const role = useFormInput(validateRole);
    
    const [success, setSuccess] = useState("");


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const firstNameValid = firstName.validate();
        const lastNameValid = lastName.validate();
        const roleValid = role.validate();

        if (!firstNameValid || !lastNameValid || !roleValid ) {
            setSuccess("");
            return;
        }

        onSubmit(role.value, {
            firstName: firstName.value,
            lastName: lastName.value
        });

        setSuccess("Form is valid!");
        firstName.inputReset();
        lastName.inputReset();
        role.inputReset();
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
    
    {firstName.errors.map((err, i) => (
        <p key={i} style={{ color: "red" }}>{err}</p>
    ))}
    
    <label htmlFor="lastName">Last Name:
        <input
            id="lastName"
            type="text"
            placeholder="Enter Last Name"
            value={lastName.value}
            onChange={lastName.valueChangeHandler}
        />
    </label>
    
    {lastName.errors.map((err, i) => (
        <p key={i} style={{ color: "red" }}>{err}</p>
    ))}

    <label htmlFor="role"> Role:
        <input
            id="role"
            type="text"
            placeholder="Enter Role"
            value={role.value}
            onChange={role.valueChangeHandler}
        />
    </label>
    
    {role.errors.map((err, i) => (
        <p key={i} style={{ color: "red" }}>{err}</p>
    ))}
    
    <input type="submit"/>
    </form>
    {success && <p style={{ color: "green" }}>{success}</p>}
    </>
    );
}

import { useState } from "react";

type EmployeeFormProps = {
    onSubmit: (
        department: string,
        employee: { firstName: string; lastName: string }
    ) => void;
};

export function EmployeeForm({ onSubmit }: EmployeeFormProps) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [department, setDepartment] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!firstName || !lastName || !department) return;

        onSubmit(department, { firstName, lastName });

        setFirstName("");
        setLastName("");
        setDepartment("");
    
    };

    return (
    <>
    <form onSubmit={handleSubmit}>
    <label htmlFor="firstName">First Name:
        <input
            type="text"
            firstName="firstName"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
        />
    </label>
    <label htmlFor="lastName">Last Name:
        <input
            type="text"
            lastName="lastName"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
        />
    </label>
    <label>
        Department:
        <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
        >
            <option value="">Select a Department</option>
            <option value="Administration">Administration</option>
            <option value="Audit">Audit</option>
        </select>
    </label>
    <input type="submit"/>
    </form>
    </>
    );
}

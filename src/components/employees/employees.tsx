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
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!firstName || !lastName || !department) {
            setError("Fields cannot be empty");
            setSuccess("")
            return;
        } else if (firstName.trim().length < 3 || lastName.trim().length < 3) {
            setError("Both names must be at least 3 characters");
            setSuccess("")
            return;
        } else {
            onSubmit(department, { firstName, lastName });
            setError("");
            setSuccess("Form is valid!");
            setFirstName("");
            setLastName("");
            setDepartment("");
        }
    
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
            <option value="Banking Operations">Banking Operations</option>
            <option value="Communication">Communications</option>
            <option value="Corporate Services">Corporate Services</option>
            <option value="Facilities">Facilities</option>
            <option value="Financial Services">Financial Services</option>
            <option value="Human Resources">Human Resources</option>
            <option value="Information Technology">Information Technology</option>
            <option value="IT Technician">IT Techician</option>
        </select>
    </label>
    <input type="submit"/>
    </form>
    {error && <p style={{ color: "red"}}>{error}</p>}
    {success && <p style={{ color: "green" }}>{success}</p>}
    </>
    );
}

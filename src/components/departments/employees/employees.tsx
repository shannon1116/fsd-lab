import { useState } from "react";

import useFormInput from "../../../hooks/useFormInput";
import { validateFirstName } from "../../../services/employeeService";

type EmployeeFormProps = {
    onSubmit: (
        department: string,
        employee: { firstName: string; lastName: string }
    ) => void;
};

export function EmployeeForm({ onSubmit }: EmployeeFormProps) {
    const firstName = useFormInput(validateFirstName);
    const lastName = useFormInput(validateFirstName);
    
    const [department, setDepartment] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const firstNameValid = firstName.validate();
        const lastNameValid = lastName.validate();
        const departmentValid = department.trim() !== "";

        if (!firstNameValid || !lastNameValid || !departmentValid) {
            setError("Please fill in all fields correctly.");
            setSuccess("");
            return;
        }

        onSubmit(department, {
            firstName: firstName.value,
            lastName: lastName.value,
        });

        setError("");
        setSuccess("Form is valid!");
        firstName.inputReset();
        lastName.inputReset();
        setDepartment("");
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
            <option value="IT Technician">IT Technician</option>
        </select>
    </label>
    <input type="submit"/>
    </form>
    {error && <p style={{ color: "red"}}>{error}</p>}
    {success && <p style={{ color: "green" }}>{success}</p>}
    </>
    );
}

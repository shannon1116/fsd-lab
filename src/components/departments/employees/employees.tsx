import { useState } from "react";

import useFormInput from "../../../hooks/useFormInput";
import { validateFirstName, validateLastName } from "../../../services/employeeService";

type EmployeeFormProps = {
    onSubmit: (
        department: string,
        employee: { firstName: string; lastName: string }
    ) => void;
};

export function EmployeeForm({ onSubmit }: EmployeeFormProps) {
    const firstName = useFormInput(validateFirstName);
    const lastName = useFormInput(validateLastName);
    
    const [department, setDepartment] = useState("");
    const [departmentError, setDepartmentError] = useState("")
    const [success, setSuccess] = useState("");


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const firstNameValid = firstName.validate();
        const lastNameValid = lastName.validate();
        const departmentValid = department.trim() !== "";

        if (!departmentValid) {
            setDepartmentError("Please select a department.");
        } else {
            setDepartmentError("")
        }

        if (!firstNameValid || !lastNameValid) {
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
        setDepartmentError("");
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
        <p key={i} style={{ color: "red"}}>{err}</p>
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
    {departmentError && <p style={{ color: "red" }}>{departmentError}</p>}
    
    <input type="submit"/>
    </form>

    {success && <p style={{ color: "green" }}>{success}</p>}
    </>
    );
}

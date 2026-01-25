import { useState } from "react";

function EmployeeForm() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [department, setDepartment] = useState("");

    function handleChange(e) {
        setFirstName(e.target.value);
        setLastName(e.target.value);
        setDepartment(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        alert(`${firstName} ${lastName} - ${department}`);
    }
    
    return (
    <>
    <form onSubmit={handleSubmit}>
    <label htmlFor="firstName">First Name:
        <input
            type="text"
            firstName="firstName"
            id="firstName"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
        />
    </label>
    <label htmlFor="lastName">Last Name:
        <input
            type="text"
            lastName="lastName"
            id="lastName"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
        />
    </label>
    <label>
        Department:
        <select
            value={department}
            onChange={e => setDepartment(e.target.value)}
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

export default EmployeeForm;